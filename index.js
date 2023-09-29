let currentTab = 0
let animating = false

let observer = new IntersectionObserver((entries) => {
    entries.forEach((object) => {
        // show / hide element on scroll
        scrollerEffects(object.target, object.isIntersecting)
    })
})

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

function preload() {
    // create all HTML Elements based on the data in data.js
    // create child elements then add them to a category div

    for (i=0; i<tabs.length; i++) {
        let left = -i * 100
        let y = 10

        let children = ""
        let sections = paragraphText[tabs[i]]

        for (const [headerTitle, paragraphs] of Object.entries(sections)) {
            let title = headerTitle.split(" -- ")
            // header
            let header = 
                `<div class="header scroller element" style="top: ${y}%">
                    <h3 class="paragraphTxt">${title[0]}</h3>
                </div>`

            children += header
            y += 5

            // sub-paragraphs for headers
            for (j=0; j<paragraphs.length; j++) {
                let text = paragraphs[j]
                let pg = 
                    `<div class="paragraph scroller element" style="top: ${y}%">
                        <p class="paragraphTxt">
                            ${text}
                        </p>
                    </div>`
                
                children += pg
                y += 5
            }
        }

        tabLefts[i] = left

        // category
        let html = 
            `<div class="category" id="${tabs[i]}" style="left: ${left}%; position: absolute;">
                ${children}
            </div>
            `
        document.body.innerHTML += html
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

            // effects
            swipe(tab, currentTab)
        }
    }

    let scrollers = document.querySelectorAll(".scroller")
    scrollers.forEach((element) => observer.observe(element))
}