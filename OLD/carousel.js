let slideTexts = ["Slide numero 1", "Slide numero 2", "Slide numero 3","Slide numero 4",]

function wrap(index, max) {
    if (index < 0) return max+index;
    if (index >= max) return index % max;
    return index
}

function slideCarousel(carouselId, direction) {

    let carousel = document.getElementById(carouselId)
    let children = carousel.children

    let visibleEl = 
        (children[0].style.left == "0%") ? children[0] : children[1]
    let hiddenEl = 
        (children[0].style.left == "0%") ? children[1] : children[0]

    let currentIndex = parseInt(visibleEl.dataset.currentindex)
    let newIndex = wrap(currentIndex + direction, slideTexts.length)
    let nextHTML = slideTexts[newIndex]
    let goalPercent = direction * 100
    let startPercent = goalPercent * -1

    hiddenEl.innerHTML = nextHTML
    hiddenEl.style.left = String(startPercent) + "%"
    console.log(String(startPercent) + "%")

    setTimeout(()=>{
        hiddenEl.style.transition = "all 0.5s ease"
        hiddenEl.style.left = "0%"
        visibleEl.style.transition = "all 0.5s ease"
        visibleEl.style.left = String(goalPercent) + "%" 
    }, 5)

    setTimeout(()=>{
        hiddenEl.style.transition = "all 0s ease"
        visibleEl.style.transition = "all 0s ease"
    }, 505)

    visibleEl.dataset.currentindex = String(newIndex)
    hiddenEl.dataset.currentindex = String(newIndex)
}


document.getElementById("c1-rb").onclick = function() {
    slideCarousel("carousel-1", 1)
}

document.getElementById("c1-lb").onclick = function() {
    slideCarousel("carousel-1", -1)
}