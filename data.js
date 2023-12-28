// TABULAR DATA

let tabs = [
    "What is Dissiax?",
    "Why Dissiax?",
    "Services",
    "Contact Us",
]
let tabLefts = []

// text that appears in the paragraph boxes
let paragraphText = {
    /// WHAT IS DISSIAX?
    "What is Dissiax?": {
        /*
        headerText: [pgText, pgText, ..., pgText]
        */

        "What is Dissiax? -- default": [
            "Dissiax is comprised of hardworking individuals who thrive in creating an enjoyable experience for you, the user. Despite being founded within the calendar year, Dissiax has satisfied an array of customers with our website and server hosting services. Our team is eager to get to work on any related projects we can, and we hope you choose us for your [insert relevant word] needs."
        ],
        
        "History of Dissiax -- default": [
            "Before Dissiax was an actual company, Brenden Adolfson, the CEO of Dissiax, would spend countless hours figuring out the innerworkings of everything he could get his hands on, which eventually led him to computers.", 
            "He originally found his love with minecraft, and would spend hours developing mods and uploading it to his youtube channel. When he got older, he wanted to know how computers actually functioned, which led him down a rabbit hole to developing his own operating system which is still being worked on to this day.",
            "Dissiax has grown into a server hosting service, while the operating system has been put on the back burner as a research project.",
        ],
    },

    /// WHY DISSIAX?
    "Why Dissiax?": {
        "Why Dissiax? -- default" : [
            "Cuz we awesome!"
        ],

        "Why Dissiax?? -- default" : [
            "Cuz we awesome!"
        ],
    },

    /// SERVICES
    "Services": {
        "Services? -- default" : [
            "She got a pound she might just serve it (Serrrrr-err-erve)"
        ],
    },

    /// CONTACT
    "Contact Us": {
        "Contact -- default" : [
            "Bitches call my phone be like blahblah blahblah"
        ],
        "Contact! -- default" : [
            "rahrah rahrah yayayaya blahblah blahblah"
        ],
        "carousel-1 -- carousel": [
            "Slide numero 1", 
            "Slide numero 2", 
            "Slide numero 3",
            "Slide numero 4",
        ],
    },
}

// navbar bg & header1 text colors
let headerColors = {
    "What is Dissiax?":"rgb(48, 141, 255)",
    "Why Dissiax?":"rgb(224, 81, 70)",
    "Services":"rgb(255, 202, 97)",
    "Contact Us":"rgb(98, 195, 0)",
}

// paragraph background colors
let paragraphColors = {
    "What is Dissiax?":"rgb(211, 224, 255)",
    "Why Dissiax?":"rgb(224, 181, 170)",
    "Services":"rgb(255, 241, 170)",
    "Contact Us":"rgb(202, 255, 191)",
}

// paragraph text colors
let paragraphTextColors = {
    //"What is Dissiax?":"rgb(48, 141, 255)",
    //"Why Dissiax?":"rgb(224, 81, 70)",
    //"Services":"rgb(255, 202, 97)",
    //"Contact Us":"rgb(98, 195, 0)",

    "__Default": "rgb(0, 0, 0)", // used if entry for any of the above isn't found
}