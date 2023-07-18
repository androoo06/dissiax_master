var listElements
var headers
var statuses = {}
var currentScrn = "What is Dissiax?"

var observer = new IntersectionObserver((entries) => {
    entries.forEach((object) => {
        if (object.isIntersecting) {
            // show
            showParagraph_TEST(object.target, true)
        } else {
            // hide
            showParagraph_TEST(object.target, false)
        }
    })
})

function getOtherDirection(original) {
    return (original === "right") ? "left" : "right"
}

function slide(element, original) {
    var newOther  = getOtherDirection(original)

    var width = element.clientWidth
    var parentWidth = element.parentElement.clientWidth
    var percent = Math.round(100 * width / parentWidth)

    element.style.transition = "1s"

    if (newOther === "left") {
        element.style.left = "12.5%"
    } else {
        element.style.left = String(100 - percent - 12.5)+"%"
    }

    setTimeout(() => {
        element.style.transition = "0s"
    }, 1100);

    statuses[element.id] = newOther
}

function changeText(header, categoryName) {
    var pgs = header.children

    pgs[0].style.opacity = 0;
    pgs[0].style.transition = "0.5s"
    setTimeout(function(){
        pgs[0].innerHTML = (header.id == "header1") ? categoryName : textWall[categoryName];
        pgs[0].style.opacity = 1;
    }, 525)
    setTimeout(function(){
        pgs[0].style.transition = "0s"
    }, 1027)
}

function changeNavbar(categoryName) {
    var navbar = document.getElementById("navbar")
    navbar.style.transition = "0.5s"
    navbar.style.backgroundColor = colorWall[categoryName] || "white"

    setTimeout(function(){
        navbar.style.transition = "0s"
    }, 1027)
}

function showParagraph_TEST(obj, bool) {
   obj.style.opacity = bool ? 1 : 0
}

function changePgs(categoryName) {
    var h1 = document.getElementById("header1")
    var h2 = document.getElementById("header2")
    var hs = [h1, h2]

    hs.forEach(h => {
        h.style.backgroundColor = pgColorWall[categoryName] || "white"

        var pg = h.children[0]
        pg.style.color = colorWall[categoryName] || "white"
    });
}

window.onload = function() {
    listElements = Array.prototype.slice.call(document.getElementsByClassName("child"))
    headers = Array.prototype.slice.call(document.getElementsByClassName("alpha"))

    var h1 = document.getElementById("header1")
    var h2 = document.getElementById("header2")

    statuses[h1.id] = "right"
    statuses[h2.id] = "left"

    slide(h1, "right")
    slide(h2, "left")

    listElements.forEach(child => {
        child.onclick = function() {
            if (currentScrn === child.id) return;
            currentScrn = child.id

            // alternates positions of UI elements
            slide(h1, statuses["header1"])
            slide(h2, statuses["header2"])

            // changes the text
            changeText(h1, child.id)
            changeText(h2, child.id)

            // changes navbar color
            changeNavbar(child.id)

            // changes headers
            changePgs(child.id)
        }
    })

    var scrollers = document.querySelectorAll(".scroller")
    scrollers.forEach((element) => observer.observe(element))
}