let currentTab = 0
let animating = false
let carouselMoving = false

//carouselHTMLs[title[0]] = paragraphs

let observer = new IntersectionObserver((entries) => {
    entries.forEach((object) => {
        // show / hide element on scroll
        scrollerEffects(object.target, object.isIntersecting)
    })
})

function wrap(index, max) {
    if (index < 0) return max + index;
    if (index >= max) return index % max;
    return index
}

function scrollerEffects(scroller, bool) {
    scroller.style.opacity = bool ? 1 : 0
}

function getTab(id) {
    return parseInt(id.split("#")[1])
}

function swipe(newTab, oldTab) {
    // slide all the tabs over left/right
    let steps = Math.abs(newTab - oldTab)
    let dir = Math.sign(newTab - oldTab)
    let len = tabs.length

    // debounce to stop from possible jitterclicking
    animating = true
    setTimeout(() => {
        animating = false
    }, 502 * steps)

    // navbar color
    let navbar = document.getElementById("navbar")
    navbar.style.backgroundColor = headerColors[tabs[newTab]] || "var(--light)"

    // shift all elements over left/right 100% to align with what the user clicked
    for (let i=0; i<steps; i++) { // steps to get to desired
        for (let j=0; j<len; j++) { // applying the step to each element(category)
            
            tabLefts[j] += (dir * 100)
            
            let percent = `${tabLefts[j]}%`
            let element = document.getElementById(tabs[j])

            element.style.left = percent
        }
    }

    currentTab = newTab

    document.title = tabs[newTab] + " - Dissiax"
}

function slideCarousel(carouselId, direction) {
    if (carouselMoving) return;
    carouselMoving = true

    let carousel = document.getElementById(carouselId)
    let children = carousel.children

    let visibleIndex = parseInt(carousel.dataset.currentvisible)
    let nextIndex = wrap(visibleIndex + direction, children.length)

    let visibleEl = children[visibleIndex]
    let nextEl = children[nextIndex]

    let goalPercent = direction * 100
    let startPercent = goalPercent * -1

    nextEl.style.left = String(startPercent) + "%"
        
    setTimeout(()=>{
        nextEl.style.transition = "all 0.5s ease"
        nextEl.style.left = "0%"
        visibleEl.style.transition = "all 0.5s ease"
        visibleEl.style.left = String(goalPercent) + "%"
    }, 5)

    setTimeout(()=>{
        nextEl.style.transition = "all 0s ease"
        visibleEl.style.transition = "all 0s ease"
        carouselMoving = false
    }, 505)

    carousel.dataset.currentvisible = String(nextIndex)
}

window.onload = function () {
    // preload()

    for (let id=0; id<tabs.length; id++) {
        let child = document.getElementById(`tab#${id}`)
        child.onclick = function() {
            let tab = getTab(child.id)
            if (currentTab == tab) return;
            if (animating) return;

            // change tabs
            swipe(tab, currentTab)
        }
    }

    let scrollers = document.querySelectorAll(".scroller")
    scrollers.forEach((element) => observer.observe(element))

    document.getElementById("c1-rb").onclick = function() {
        slideCarousel("carousel-1", 1)
    }
    
    document.getElementById("c1-lb").onclick = function() {
        slideCarousel("carousel-1", -1)
    }
}