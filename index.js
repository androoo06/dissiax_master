var currentScrn = "What is Dissiax?"
var statuses = {}
var inProgress = {} // For paragraphs
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

var observer = new IntersectionObserver((entries) => {
    entries.forEach((object) => {
        if (object.isIntersecting) {
            // show
            scrollerEffects(object.target, true)
        } else {
            // hide
            scrollerEffects(object.target, false)
        }
    })
})

// EFFECTS

function navbarEffects(newCategory) {
    var navbar = document.getElementById("navbar")
    changeTransition(navbar, {"transTime":transitionTimes.navbar})

    navbar.style.backgroundColor = colorWall[newCategory] || "white"
}

function alphaEffects(newCategory) {
    var alphas = Array.from(document.querySelectorAll(".alpha"))

    alphas.forEach((alpha) => {
        var direction = statuses[alpha.id] || "right"
        var newDir = getOtherDirection(direction)

        var width = alpha.clientWidth
        var parentWidth = alpha.parentElement.clientWidth
        var percent = Math.round(100 * width / parentWidth)

        changeTransition(alpha, {"transTime":transitionTimes.alpha})

        if (newDir === "left") {
            alpha.style.left = "12.5%"
        } else {
            alpha.style.left = String(100 - percent - 12.5)+"%"
        }

        alpha.style.backgroundColor = alphaColorWall[newCategory] || "white"
        statuses[alpha.id] = newDir
    })
}

function pgEffects(newCategory) {
    var pgs = Array.from(document.querySelectorAll(".paragraph1"))
    pgs.forEach((pg) => {
        var id = pg.parentElement.id
        pg.style.opacity = 0

        // add to in-progress list to avoid overlap bug later
        inProgress[id] = (inProgress[id] && inProgress[id] + 1) || 1

        changeTransition(pg, {
            "transTime":transitionTimes.pg1,
            "f": [transitionTimes.pg1, function(){
                pg.innerHTML = (id == "header1") ? newCategory : textWall[newCategory]

                if (id == "header1") {
                    pg.style.color = colorWall[newCategory] || "white"
                } else {
                    pg.style.color = alphaTextColorWall[newCategory] || alphaTextColorWall.__Default
                }
                
                setTimeout(()=>{
                    // only display if this is the last one in progress (to avoid overlap bug)
                    if (inProgress[id] == 1) {
                        changeTransition(pg, {"transTime":transitionTimes.pg1})
                        pg.style.opacity = 1
                    }

                    inProgress[id] -= 1
                }, 100)
            }]
        })
    })
}

function scrollerEffects(scroller, bool) {
    changeTransition(scroller, {"transTime":transitionTimes.scroller})
    scroller.style.opacity = bool ? 1 : 0
}

// RENDER

window.onload = function() {
    var listElements = Array.from(document.querySelectorAll(".child"))
    var alphas = Array.from(document.querySelectorAll(".alpha"))

    alphas.forEach(alpha => {
        statuses[alpha.id] = getDirection(alpha)
    })

    listElements.forEach(child => {
        child.onclick = function() {
            if (currentScrn === child.id) return;
            currentScrn = child.id

            // effects
            navbarEffects(child.id)
            alphaEffects(child.id)
            pgEffects(child.id)
        }
    })

    var scrollers = document.querySelectorAll(".scroller")
    scrollers.forEach((element) => observer.observe(element))
}