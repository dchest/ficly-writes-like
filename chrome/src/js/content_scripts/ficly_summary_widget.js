/*
    take the last N stories (4096 characters approx 4 ficlets) and send to iwl.me
    
    Recent Mashup Style
    -----------------------
    
    -------
    Entirely unscientific, we sent the last N stories, 
    containing N graphs of N length by user AUTHOR and it said it's most like Person
*/

function makeWidget(jo) {
    console.log(jo)
}

function init() {
    // I will have to send back the permalink for this page I guess as an id...
    
    // well really, it's the stories.atom, but if I used the permalink... thinking...
    chrome.extension.sendRequest({'action' : 'buildSummaryWidget' }, makeWidget)
}