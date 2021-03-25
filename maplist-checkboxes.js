// ==UserScript==
// @name         Sendou Map Checklist
// @namespace    https://github.com/DeltaJordan/sendou-checkboxes
// @version      0.1
// @description  Adds checkboxes to the maplist on sendou.ink/maps
// @author       DeltaJordan
// @match        https://sendou.ink/maps*
// @icon         https://www.google.com/s2/favicons?domain=sendou.ink
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @updateURL    https://raw.githubusercontent.com/DeltaJordan/sendou-checkboxes/main/maplist-checkboxes.js
// @downloadURL  https://raw.githubusercontent.com/DeltaJordan/sendou-checkboxes/main/maplist-checkboxes.js
// @supportURL   https://github.com/DeltaJordan/sendou-checkboxes/issues
// ==/UserScript==

var observer = new MutationObserver(resetTimer);
var timer = setTimeout(action, 3000, observer); // wait for the page to stay still for 3 seconds
observer.observe(document, {childList: true, subtree: true});

function resetTimer(changes, observer) {
    clearTimeout(timer);
    timer = setTimeout(action, 3000, observer);
}

function action(o) {
    o.disconnect();

    // Gets the textarea that contains the map list, then retrieves the contents.
    var mapListText = $('.css-125l1uo').first().text();
    // Splits the contents into an array containing each map mode combo.
    var mapListArray = mapListText.split('\n');

    // We're going backwards since we're appending to the last element in the div.
    var mapIndex = mapListArray.length + 1;
    mapListArray.reverse().forEach(mapText => {
        mapIndex--;

        // Create the checkbox element, floating it right to make it neater.
        var checkBoxHtml = document.createElement('input');
        checkBoxHtml.type = "checkbox";
        checkBoxHtml.id = "mapListItem" + mapIndex;
        checkBoxHtml.style = "float:right;";

        // Create the label element for the checkbox.
        var labelHtml = document.createElement("label");
        labelHtml.htmlFor = checkBoxHtml.id;
        labelHtml.innerText = mapText;

        // Add a break to the end of the element so its not all on one line.
        var breakHtml = document.createElement('br');

        // Add the elements to an array.
        var elements = [ checkBoxHtml, labelHtml, breakHtml ];

        // Adds all the elements after the "Save" button.
        $('.css-1v59txb').after(elements);
    });

    // Probably not the correct way to seperate elements, but works for this quick userscript.
    $('.css-1v59txb').after([document.createElement('br')]);
}
