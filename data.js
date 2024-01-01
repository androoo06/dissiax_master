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

        "What is Dissiax? -- default": [
            "Dissiax Inc. is a corporation focused on providing unbeatable computing quality. We recognized that if reinventing the wheel makes a better wheel, the progress is worth the cost. Our team will improve your experience and ensure that your data is safe."
        ],
        
        "History of Dissiax -- default": [
            "Before Dissiax was an actual company, Brenden Adolfson, the CEO of Dissiax, would spend countless hours figuring out the innerworkings of everything he could get his hands on, which eventually led him to computers.", 
            "He originally found his love with minecraft, and would spend hours developing mods and uploading it to his youtube channel. When he got older, he wanted to know how computers actually functioned, which led him down a rabbit hole to developing his own operating system which is still being worked on to this day.",
            "Dissiax has grown into a server hosting service, while the operating system has been put on the back burner as a research project.",
        ],

        "History of Dissiax -- default": [
            "Dissiax started with a question: why is it possible to hack a computer?",
            "So we started creating server software to try to prevent cyber security attacks, and we found more systems that had problems. Our scope broadened to improving all these systems, but there were restrictions and issues we found within operating systems, not just the applications. Then we started over and decied to rebuild our software from the ground up. Our thought was that if you need to keep patching holes, maybe we should rebuild the base stronger instead of only partching it.",
            "We had years of issues, starting over from scratch many times, and learning. Once we finally had a server that could handle clients better than anything else we've found, we created the corporation Dissiax Inc.",
            "Since then, we've continues to expand our servers' capabilities, create and improve applications, and improve anything else we can find."
        ],

        "Mission, Vision, & Values -- default": [
            "<u>Our Mission</u> :<br>To perfect software",
            "<u>Our Vision</u> :<br>A world where no one worries about cyber security, all ocmputers run perfectly optimized without waist, and all applications are intuative and easy to use",
            "<u>Our Values</u> :<br>&nbsp;&#149; Forthright honestly<br>&nbsp;&#149; Constructive criticism"
        ]
    },

    /// WHY DISSIAX?
    "Why Dissiax?": {
        "Who We Help -- default" : [
            "<u>We help organizations who:</u><br>&#149; Have sensative infomration to protect<br>&#149; Want access to their data anywhere with internet<br>&#149; Want access to their data restricted to certain areas or devices<br>&#149; Don't want to worry about losing their data or having it used against them"
        ],

        "Why Dissiax? -- default" : [
            "<b>Our servers will keep your information safe and secure.</b><br>We designed and tested every peice of software running in our servers over years to ensure their reliability and security. No matter what anyone sends at our servers, you will stay safe.",
            "<b>We provide you with applications that are intuative and easy to use.</b><br>If anything doesn't make sense or is unsatisfactory, we will glady make changes to your liking and even fully redesign applications until you're happy"
        ],
    },

    /// SERVICES
    "Services": {
        "Services -- default" : [
            "We provide secure servers to handle data storage and easy to use applications for connecting to those servers",
            "<b>Some examples are</b> :<br>1. Storing records<br>2. Hosting file servers<br>3. Storing proprietary and sensative data<br>4. Hosting websites"
        ],
        "Service Methods -- default": [
            "<b>Our most common methods of service are</b>:<br>&#149; We host a server that you connect to<br>&#149; We install a server at your facility that you interact with",
            "We would be happy to hear from you if you have any questions or requests"
        ]
    },

    /// CONTACT
    "Contact Us": {
        "Contact -- default" : [
            "Let us know if you have any questions or requests; we look forward to hearing from you",
            "email: dissiaxinc@gmail.com<br>phone: (612) 532-2487"
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