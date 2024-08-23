let mobileWidth = 600;
let currentTab = null
let currentItems = null
let animating = false
let carouselMoving = false

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

/// Responsiveness ///

function switchToMobile() {
    let style = getComputedStyle(document.body);
    let bgColor = style.getPropertyValue(`--header-${currentTab}`)

    // $(".header").css("background-color", bgColor)
}

function switchToPC() {
    let style = getComputedStyle(document.body);
    let bgColor = style.getPropertyValue(`--pg-${currentTab}`)

    // $(".header").css("background-color", bgColor)
}

function displayWindowSize() {
    let w = document.documentElement.clientWidth;

    if (w < mobileWidth) {
        switchToMobile()
    } else {
        switchToPC()
    }
}

/// Site ///

function generateCarousel(carouselId, carouselData) {
    let slides = ""
    for (let i=0; i<carouselData.length; i++) {
        let data = carouselData[i]
        let left = (i == 0) ? "0%" : "-100%";
        let str = `
            <div style="left: ${left};"">
                <h3 style="background-color: transparent;">${data[0]}</h3>
                <div>
                    ${data[1]}
                </div>
            </div>
        `
        slides += str
    }

    var xmlString = `
        <div class="carousel carousel-color scroller" style="left: -77.5%;">
            <button id="c1-lb" class="left-btn" style="left: 0;">〈</button>
            <div id="${carouselId}" data-currentvisible="0">
                ${slides}
            </div>
            
            <button id="c1-rb" class="right-btn" style="right: 0;">〉</button>
        </div>
    `;
    
    const parser = new DOMParser();
    let document = parser.parseFromString(xmlString, "text/html");

    let carousel = document.body.children[0]
    return carousel
}

// preload tab outside of screen, and fade it in
function loadTab(tabName) {
    let padElement = document.createElement("div")
    $(padElement).addClass("pad1")
    
    let dummyContent = document.createElement("div")
    dummyContent.id = "dummyContent"
    dummyContent.appendChild(padElement)

    let items = [dummyContent]
    
    // load dummy items in
    for (const [header, paragraphTexts] of Object.entries(paragraphText[tabName])) {
        if (header.includes("$CAROUSEL$")) {
            let newHeader = header.split("$CAROUSEL$")[1]
            let carousel = generateCarousel(newHeader, paragraphTexts)
            dummyContent.appendChild(carousel)
            dummyContent.appendChild(padElement.cloneNode(true))
            items.push(carousel)
            continue;
        }

        let headerEl = document.createElement("div")
        $(headerEl).css("left", "137.5%")
        $(headerEl).css("opacity", "0")
        $(headerEl).addClass("header content-box scroller");
        $(headerEl)[0].innerHTML = header

        dummyContent.appendChild(headerEl)
        dummyContent.appendChild(padElement.cloneNode(true))
        items.push(headerEl)

        paragraphTexts.forEach(txt => {
            let pgEl = document.createElement("div")
            $(pgEl).css("left", "-87.5%")
            $(pgEl).css("opacity", "0")
            $(pgEl).addClass("paragraph content-box scroller")

            let htmlTxt = txt
            if (htmlTxt.includes("$SUBHEADER$")) {
                htmlTxt = txt.split("$SUBHEADER$")[1]
                $(pgEl).addClass("subheader")
            }
            $(pgEl)[0].innerHTML = htmlTxt

            dummyContent.appendChild(pgEl)
            dummyContent.appendChild(padElement.cloneNode(true))
            items.push(pgEl)
        })
    }

    for (let i=0; i<2; i++) {
        dummyContent.appendChild(padElement.cloneNode(true))
    }

    let mobilePadElement = document.createElement("div")
    $(mobilePadElement).addClass("mobilePad")
    dummyContent.appendChild(mobilePadElement)

    return items
}

function fade(list, out) {
    for (i=1; i<list.length; i++) {
        if ($(list[i]).hasClass("paragraph")) {
            list[i].style.left = (out) ? "-87.5%" : "12.5%"
        } else if ($(list[i]).hasClass("header")) {
            list[i].style.left = (out) ? "137.5%" : "37.5%"
        } else if ($(list[i]).hasClass("carousel")) {
            list[i].style.left = (out) ? "-77.5%" : "22.5%"
        }
        list[i].style.opacity = (out) ? 0 : 1
    }
}

function switchTabs(x) {
    let oldItems = currentItems
    let oldTab = currentTab
    currentTab = $(x.target).data("tabname")

    if (oldTab == currentTab) return;

    let items = loadTab(currentTab)
    currentItems = items

    let dummyContent = items[0]
    let oldContent = $("#content")[0]

    oldContent.id = "dying"
    oldContent.style.position = "absolute"
    oldContent.style.overflow = "hidden"
    oldContent.style.height = "100%";
    
    dummyContent.id = "content"
    document.body.appendChild(dummyContent)

    if (oldItems !== null) {
        fade(oldItems, true)
    }

    setTimeout(function () {
        fade(items, false)
    }, 0)

    setTimeout(function () {
        document.body.removeChild(oldContent)
        // dummyContent.style.position = "relative"
    }, 2500)

    let style = getComputedStyle(document.body);
    let navColor = style.getPropertyValue(`--header-${currentTab}`)
    let pgColor = style.getPropertyValue(`--pg-${currentTab}`)

    $("#navbar").css("background-color", navColor)
    $(".content-box").css("background-color", pgColor)
    $(".carousel-color").css("background-color", pgColor)

    loadParticles(pgColor)
    onScroll()
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

function scrollerEffects(scroller, bool) {
    scroller.style.opacity = bool ? 1 : 0
}

function rgbToHex(color) {
    var a = color.split("(")[1].split(")")[0];
    a = a.split(",");
    var b = a.map(function(x){             //For each array element
        x = parseInt(x).toString(16);      //Convert to a base16 string
        return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
    })
    b = "#"+b.join("");
    return b
}

function loadParticles(colorRGB) {
    let color = rgbToHex(colorRGB)
    console.log(color)
    particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 20,
                    "density": {
                        "enable": false,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": color
                },
                "shape": {
                    "type": "polygon",
                    "stroke": {
                        "width": 0,
                        "color": color
                    },
                    "polygon": {
                        "nb_sides": 6
                    },
                    "image": {
                        "src": "assets/Dissiax_Logo.png",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 1,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": color,
                    "opacity": 0.75,
                    "width": 2
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": false,
                        "mode": "grab"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 100,
                        "size": 15,
                        "duration": 0.25,
                        "opacity": 1,
                        "speed": 1
                    },
                    "repulse": {
                        "distance": 100
                    },
                    "push": {
                        "particles_nb": 10
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        }
    );
}

function onScroll(x) {
    let style = getComputedStyle(document.body);
    let maxScroll = Math.ceil($("#content")[0].scrollHeight - $("#content").innerHeight())
        
    if (maxScroll > 0) {
        maxScroll = Math.max(25, maxScroll)
    }
    
    let gradientPercent = Math.min(1, $(document.body).scrollTop() / maxScroll) * 48
    let otherPercent = 100 - gradientPercent

    // const fromPercent = (from,to,current) => ((to - from) * current/100) + from;
    // let p = Math.floor(gradientPercent * 360)
    
    let navColor = style.getPropertyValue(`--header-${currentTab}`)
    console.log(navColor)

    let grad = `linear-gradient(white ${Math.max(45, otherPercent)}%, ${navColor} ${gradientPercent}%)`
    $("body").css("background",grad)
}

$(function () {
    $(".tab-switch").on("click", switchTabs)

    // displayWindowSize();
    // window.addEventListener("resize", displayWindowSize);

    let aboutUs = {target: $("#tab-about")[0].children[0]}
    switchTabs(aboutUs)

    $(document.body).on("click", "#c1-rb", function() {
        slideCarousel("carousel-1", 1)
    })

    $(document.body).on("click", "#c1-lb", function() {
        slideCarousel("carousel-1", -1)
    })

    let style = getComputedStyle(document.body);
    $(document.body).on('scroll', onScroll)

    let scrollers = document.querySelectorAll(".scroller")
    scrollers.forEach((element) => observer.observe(element))

    let pgColor = style.getPropertyValue(`--pg-${currentTab}`)
    loadParticles(pgColor)
})
