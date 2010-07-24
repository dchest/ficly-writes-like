/*
    Copyright: see README
*/

/*
    Author Page Widget
        On an author page, show which stories have been compared already
            Widget: Show Count and Current 'Style' via iwl.me in localstorage only
        Inline, show comparsion name 
            TITLE is like AUTHOR
            
        
        
        var ficly_author_elem = document.getElementById("hcard").getElementsByTagName("h1")[0].getElementsByTagName("a")[0]
        
        var ficly_athor = ficly_author_elem.innerText, ficly_url = ficly_author_elem.getAttribute("href");
        
        var widget_p = document.getElementById("secondary-content");
        
        
*/

var story_elements;

function makeWidget( data ) {
    console.log("making author widget", data)
}

function findStories() {
    var story_elems = document.getElementsByClassName("entry-title"), links = [];
    console.log("found story elems", story_elems)
    story_elements = story_elems;
    for(var i=0; i<story_elems.length; i++) {
        var story = story_elems[i].getElementsByTagName("a")[0], title = story.innerText, link = story.getAttribute("href");
        
        links.push( link )
    }
    
    console.log("found stories", links)
    
    if(link.length <=0 ) return;
    
    // phone home (to brain) with links
    chrome.extension.sendRequest({'action' : 'buildAuthorWidget', 'links' : links }, makeWidget)

}

function init() {
    findStories();
}

init();