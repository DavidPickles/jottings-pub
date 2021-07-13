import * as jquery from './lib/jquery-3.6.0.min.js'

export default ({ratingsSelector}) => {
    $( document ).ready(  () => {
        $(ratingsSelector).each( (i,el) => el.innerHTML = toStars( el.dataset.ratingValue) )
    })
}

function toStars(val) {
    const yellows = '<i class="fas fa-star" style="color: gold;"></i>'.repeat(val/2)
    const half = val%2 === 1 ? '<i class="fas fa-star-half-alt" style="color: gold"></i>' : ''
    const whites = '<i class="far fa-star" style="color: gold"></i>'.repeat(5 - val/2)
    return yellows + half + whites
}