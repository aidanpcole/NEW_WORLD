let checkies;
/* This is a scratch space to think of functions and
try to work them out

## Needs
[X] function to open/close the bottom bar
[ ] function to open/close the side bar
[ ] function to switch tabs on side bar
[ ] filters on the map --> not quite figure out yet
[ ] layers toggle on and off for map
[ ]

*/

/* funtion to open/close the bottom bar
see: accordion-horizontal.js
*/

/* function to open/close the bottom bar:
needs to affect the size of the parent div that it is in and
it needs to tell what the other buttons to do. */



/* function to switch tabs on side bar
if   the .accordion-vert button is expanded, as seen here in this funciont:
const butnclick = function () {
  let sidebar = document.querySelector(".side-bar");
  const btns = sidebar.querySelectorAll(".accordion-vert");
  btns.forEach((b) => {
    b.onclick = () => {
      isSidebarOpen();
    };
  })
} */

function fillSlide(slide) {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slideTitleDiv.innerHTML = `<h2>${slide.title}</h2>`;
  slideContentDiv.innerHTML = converter.makeHtml(slide.content);
}

const sidebarContentController = function (slide) {
  console.log("you've called the sidebarContentController fn");
  if (slide.includes("story")) {
    // show story slide
    fillSlide(slides[0]);
  }
  if (slide.includes("filter")) {
    // show fitlers/layers slide
    fillSlide(slides[1]);
    let checkboxContainer = document.querySelector(".slide-content");
    checkies = checkboxContainer.firstChild.querySelectorAll("input");
    console.log("MID SIDEBAR");
    let allButResources = [checkies[0],
      checkies[1],
      checkies[2],
      checkies[3],
      checkies[4],
      checkies[5],
      checkies[6],];

    checkies[0].addEventListener("change", PMTFVCheck);
    checkies[1].addEventListener("change", NOTWOCheck);
    checkies[2].addEventListener("change", OZONECheck);
    checkies[3].addEventListener("change", LIGHTCheck);
    checkies[4].addEventListener("change", GREENCheck);
    checkies[5].addEventListener("change", BLUESCheck);
/*  checkies[4].addEventListener("change", SOURCECheck); */
    console.log("before check");
    allButResources.forEach(abr => abr.addEventListener("change", onCheck));
		map.eachLayer(function(layer) {
  	if (!!layer.toGeoJSON) {
    map.removeLayer(layer);
  	}
		});
    checkies[0].click();
  }
};


const isSidebarOpen = function (slide) {
  console.log("you've called the isSidebarOpen fn");
  if (slide.includes("accordion-vert-trigger")) {
    console.log("great");
  } else if (sidebar.getAttribute("class").includes("open") !== true) {
    console.log("aria is not open");
    const headings = document.querySelectorAll(".accordion-vert");
    let btn = headings[0].querySelector("button");
    let target = headings[0].parentElement.parentElement.nextElementSibling;
    openItemArrow(target, btn);
    console.log("just called accordion fn");
    // and now call the function to load the content
    sidebarContentController(slide);
  } else {
    sidebarContentController(slide);
  }
};



sidebar.addEventListener('click', ({ target }) => {
  if (target.matches('button')) {
    let slide = target.getAttribute("class");
    isSidebarOpen(slide);
  }
});
/* global sidebar, slideContentDiv, slideTitleDiv,
layerGroup, onCheck,
TWTENCheck, TWELECheck, TWTWECheck, TWTHICheck, TWFOUCheck,
TWFIFCheck, TWSIXCheck, TWSEVCheck, TWEIGCheck, TWNINCheck, slides,
openItemArrow, showdown */
