import * as jquery from './lib/jquery-3.6.0.min.js'

export default ({ratingsSelector}) => {
    $( document ).ready(  () => {
        $(ratingsSelector).each( (i,el) => el.innerHTML = toStars( el.dataset.ratingValue) )
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