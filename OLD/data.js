// TABULAR DATA

// text that appears in the paragraph boxes
var textWall = {
    "What is Dissiax?": {
        /*
        headerText: [pgText, pgText, ..., pgText]
        */

        "What is Dissiax? --default": [
            "Dissiax is comprised of hardworking individuals who thrive in creating an enjoyable experience for you, the user. Despite being founded within the calendar year, Dissiax has satisfied an array of customers with our website and server hosting services. Our team is eager to get to work on any related projects we can, and we hope you choose us for your [insert relevant word] needs."],
        
        "History of Dissiax --default": [
            "Before Dissiax was an actual company, Brenden Adolfson, the CEO of Dissiax, would spend countless hours figuring out the innerworkings of everything he could get his hands on, which eventually led him to computers.", 
            "He originally found his love with minecraft, and would spend hours developing mods and uploading it to his youtube channel. When he got older, he wanted to know how computers actually functioned, which led him down a rabbit hole to developing his own operating system which is still being worked on to this day.",
            "Dissiax has grown into a server hosting service, while the operating system has been put on the back burner as a research project.",
        ],

        "Who is Dissiax --playercard": [

        ],
    },

    "Services": {

    },

    "Contact Us": {
        
    },
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