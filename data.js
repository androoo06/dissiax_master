// TABULAR DATA

// text that appears in the paragraph boxes
var textWall = {
    "What is Dissiax?":"Lorem1",
    "Why Dissiax?":"Lorem2",
    "Services":"Lorem3",
    "Contact Us":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem distinctio, cumque vel molestiae ipsum earum ullam alias dolorem deleniti omnis tempore porro corrupti placeat provident nisi quibusdam pariatur! Iste, minus!",
}

// navbar bg & header1 text colors
var colorWall = {
    "What is Dissiax?":"rgb(48, 141, 255)",
    "Why Dissiax?":"rgb(224, 81, 70)",
    "Services":"rgb(255, 202, 97)",
    "Contact Us":"rgb(98, 195, 0)",
}

// paragraph background colors
var alphaColorWall = {
    "What is Dissiax?":"rgb(211, 224, 255)",
    "Why Dissiax?":"rgb(224, 181, 170)",
    "Services":"rgb(255, 241, 170)",
    "Contact Us":"rgb(202, 255, 191)",
}

// paragraph text colors
var alphaTextColorWall = {
    //"What is Dissiax?":"rgb(48, 141, 255)",
    //"Why Dissiax?":"rgb(224, 81, 70)",
    //"Services":"rgb(255, 202, 97)",
    //"Contact Us":"rgb(98, 195, 0)",

    "__Default": "rgb(0, 0, 0)", // used if entry for any of the above isn't found
}

var transitionTimes = {
    "alpha":1,
    "navbar":0.5,
    "scroller":1.25,
    "pg1":0.5,
}

// UTIL FUNCTIONS

function getDirection(object) {
    var percent = object.offsetLeft / window.innerWidth
    return (percent <= 0.125) ? "left" : "right"
}

function getOtherDirection(original) {
    return (original === "right") ? "left" : "right"
}

async function changeTransition(object, custom) {
    var revertDelay = custom.revertDelay || custom.transTime

    object.style.transition = String(custom.transTime) + "s"

    if ("f" in custom) {
        setTimeout(() => {
            custom.f[1]()
        }, (custom.f[0] * 1000))
    }

    setTimeout(() => {
        object.style.transition = "0s"
    }, (revertDelay * 1000) + 27);

    if ("yield" in custom) {
        await sleep((revertDelay * 1000) + 27)
    }
}