import * as jquery from './lib/jquery-3.6.0.min.js'

const ratingsSelector = '.rating-stars'
const sortKeySelector = '[name="book-sort-key"]'
const sortDirectionSelector = '[name="book-sort-direction"]'
const bookSelector = '.book'
const bookListSelector = '#books'

let sortKey
let sortDirection

export default () => {
    $( document ).ready(  () => {
        $(ratingsSelector).each( (i,el) => el.innerHTML = toStars( el.dataset.ratingValue) )
        sortKey = $(sortKeySelector + ':checked').val()
        sortDirection = $(sortDirectionSelector + ':checked').val()
        // defensive, otherwise a bit brittle, relying on sort order of incoming data matching controls
        $(bookListSelector).html( getSortedBooks(sortKey, sortDirection) )
        // set up change events
        $(sortKeySelector).change( ev => changeSortKey(ev.currentTarget.value) )
        $(sortDirectionSelector).change( ev => changeSortDirection(ev.currentTarget.value) )
    })
}

// val must be 0-10
function toStars(val) {
    const stars = (icon, count) => `<i class="${icon}" style="color: gold;"></i>`.repeat(count)
    const full = stars("fas fa-star", val/2)
    const half = stars("fas fa-star-half-alt", +val%2)
    const empty = stars("far fa-star", 5 - val/2)
    return full + half + empty
}

function changeSortDirection(direction) {
    sortDirection = direction
    $(bookListSelector).html( getSortedBooks(sortKey, sortDirection) )
}

function changeSortKey(key) {
    sortKey = key
    $(bookListSelector).html( getSortedBooks(sortKey, sortDirection) )
}

function getSortedBooks(sortKey, sortDirection) {
    const numeric = (orientation, a, b) => orientation * (parseInt(a) - parseInt(b))
    const alpha = (orientation, a, b) => orientation * ( a.toLowerCase().localeCompare(b.toLowerCase()) )
    const compOrientation = sortDirection === 'ascending' ? 1 : -1
    const sortedBooks = $(bookSelector).sort( (el1, el2) => {
        const a = el1.dataset[sortKey]
        const b = el2.dataset[sortKey]
        if (sortKey === 'ratingValue') {
            return numeric(compOrientation, a, b)
        } else {
            return alpha(compOrientation, a, b)
        }
    })
    return sortedBooks
}