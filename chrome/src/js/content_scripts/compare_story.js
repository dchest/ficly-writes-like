// this runs on a ficly story page
/*
    1. find the story ID
    2. Find the story / page url
    3. get the 'body' contents: aka get the story text.
    4. Send all these values to the main_brain.html
        -- wait for response
        -- receive response
            All page widget
                (can I run chrome.extension.executeScript here????)
                
*/

var port = chrome.extension.connect({ "name" : "story"}), page_links,
    timeout_link;
    
    
port.onMessage.addListener(function(msg) {
    //  listen for messages from the brain
    // TODO
    // do stuff here
    
}); 


function find_story_id() {
    var links = document.getElementsByTagName('link')    
    // filter it down
    /*
        type=​"application/atom+xml"
    */
    var type, feeds = [];
    console.log('finding links', links.length);
    
    for(var i=0; i<links.length; i++) {
        type = links[i].getAttribute('type')
        console.log(type)
        if( type === "application/atom+xml") {
            feeds.push(links[i].getAttribute('href'))
        }
    }
    
    /*
        I can figure out who you are logged in as if you visit the ficly homepage
    */
    console.log(feeds)
}

function find_ficly_text() {
    var divs = document.getElementsByTagName('div'), story_text = "";
    
    for(var i=0; i<divs.length; i++) {
        if( divs[i].className === "entry-content") {
            story_text = divs[i].innerHTML;
        }
    }
    
    
    console.log(story_text)
    
    
}
 
function init()  {
    console.log(document.location)
    find_story_id()
}  

init()