var listElements
var headers
var statuses = {}
var currentScrn = "What is Dissiax?"

var textWall = {
    "What is Dissiax?":"Lorem1",
    "Why Dissiax?":"Lorem2",
    "Services":"Lorem3",
    "Contact Us":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, quidem vel. Exercitationem ipsa eligendi, aspernatur aut nemo debitis? Nobis illo voluptatibus pariatur quos veritatis dicta et itaque dignissimos amet molestiae?",
}

var colorWall = {
    "What is Dissiax?":"rgb(48, 141, 255)",
    "Why Dissiax?":"rgb(224, 81, 70)",
    "Services":"rgb(222, 209, 33)",
    "Contact Us":"rgb(34, 166, 19)",
}

var pgColorWall = {
    "What is Dissiax?":"rgb(211, 224, 255)",
    "Why Dissiax?":"rgb(224, 181, 170)",
    "Services":"rgb(222, 209, 133)",
    "Contact Us":"rgb(134, 255, 119)",
}

function other(original) {
    if (original === "left") return "right"
    if (original === "right") return "left"
    
    return "right"
}

function slide(element, original) {
    var newOther  = other(original)

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

function changePgs(categoryName) {
    var h1 = document.getElementById("header1")
    var h2 = document.getElementById("header2")
    var hs = [h1, h2]

    hs.forEach(h => {
       // h.style.transition = "0.5s"
        h.style.backgroundColor = pgColorWall[categoryName] || "white"

        var pg = h.children[0]
        //pg.style.transition = 
        pg.style.color = colorWall[categoryName] || "white"
        console.log("a")

        // setTimeout(function(){
        //     h.style.transition = "0s"
        // }, 550)
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
}