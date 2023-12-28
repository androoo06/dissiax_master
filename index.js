let currentTab = 0
let animating = false
let carouselMoving = false

let carouselHTMLs = {}

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
}

function slideCarousel(carouselId, direction) {
    if (carouselMoving) return;
    carouselMoving = true

    let carousel = document.getElementById(carouselId)
    let children = carousel.children

    let visibleEl = 
        (children[0].style.left == "0%") ? children[0] : children[1]
    let hiddenEl = 
        (children[0].style.left == "0%") ? children[1] : children[0]

    let currentIndex = parseInt(visibleEl.dataset.currentindex)
    let newIndex = wrap(currentIndex + direction, carouselHTMLs[carouselId].length)
    let nextHTML = carouselHTMLs[carouselId][newIndex]
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
        carouselMoving = false
    }, 505)

    visibleEl.dataset.currentindex = String(newIndex)
    hiddenEl.dataset.currentindex = String(newIndex)
}

function preload() {
    // create all HTML Elements based on the data in data.js
    // create child elements then add them to a category div

    for (i=0; i<tabs.length; i++) {
        let left = -i * 100
        let y = 10

        let children = ""
        let section = tabs[i]
        let sections = paragraphText[section]

        let txtColor = headerColors[section]
        let bgColor = paragraphColors[section] 

        for (const [headerTitle, paragraphs] of Object.entries(sections)) {
            let title = headerTitle.split(" -- ")

            if (title[1] == "default") {
                // header
                let header = 
                `<div class="header scroller element" style="top: ${y}%; background-color: ${bgColor};">
                    <h3 class="paragraphTxt" style="color: ${txtColor};">${title[0]}</h3>
                </div>`

                children += header
                y += 5

                // sub-paragraphs for headers
                for (j=0; j<paragraphs.length; j++) {
                    let text = paragraphs[j]
                    let pg = 
                        `<div class="paragraph scroller element" style="top: ${y}%; background-color: ${bgColor};">
                            <p class="paragraphTxt">
                                ${text}
                            </p>
                        </div>`

                    children += pg
                    y += 5
                }
            } else {
                y += 5
                children += 
                    `<div class="carousel scroller element" style="position: relative; top: ${y}%; background-color: ${bgColor};">
                        <button id="c1-lb" class="left-btn" style="left: 0;">〈</button>
                        <div id="carousel-1">
                            <h3 data-currentIndex="0" style="left: 0%; color: ${txtColor}">Slide numero 1</h3>
                            <h3 data-currentIndex="0" style="left: -100%; color: ${txtColor}">Slide numero 2</h3>
                        </div>
                        <button id="c1-rb" class="right-btn" style="right: 0;">〉</button>
                    </div>`
                
                carouselHTMLs[title[0]] = paragraphs
            }
        }

        tabLefts[i] = left

        // category
        document.body.innerHTML += 
            `<div class="category" id="${section}" style="left: ${left}%; position: absolute;">
                ${children}
            </div>
            `
    }
}

window.onload = function () {
    preload()

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