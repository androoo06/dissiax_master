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