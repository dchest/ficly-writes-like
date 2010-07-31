
/*
    Load this on all ficly.com pages, send messages as needed via a port... 
    though this only really runs once, so a send request would be fine...
    
    var port = chrome.extension.connect({ "name" : "story"})
*/


var author_data = {}

function url_parse() {
    var url_pattern = "\/([a-zA-Z]{2,})\/([a-zA-Z0-9\-_]{2,})\/?([a-zA-Z]{2,})?",
        regex = new RegExp( url_pattern ),
        matches = document.location.pathname.match(regex);
        
    return matches;
}

function find_entry_content() {
    //return document.getElementsByClassName('entry-content')[0].innerHTML
    var content = document.getElementsByClassName('entry-content')[0];
    var graphs = content && content.getElementsByTagName("p") || [];
    var data = [];
    
    if(graphs.length <= 0 ) return "";
    for(var i=0; i<graphs.length; i++) {
        data.push( graphs[i].innerText );
    }
    
    return data.join("\n\n\n")
}

function analyze_urls() {
    
    // do a regex to find out where I am, possible values:
        /*
            1. home: ficly.com
            2. profile page: http://ficly.com/authors/elshahawk
            3. story: http://ficly.com/stories/19349
            4. your current piece: http://ficly.com/stories/new
            5. editing a story you wrote: http://ficly.com/stories/19347/edit
            6. a blog entry: http://ficly.com/blog/the-book-of-ficly-let-voting-commence
        
        */
        
        var matches = url_parse(), message=null;
        //console.log("matches", matches)
        var page_type = matches && matches[1] || null
        if(page_type === null) {
            //console.log("not a page to worry about, bail")
            return;
        }
        switch( page_type ) {

            case "blog":
                //console.log("this is a blog post, grab the page data and commence the testing of this snippet to iwl.me")
                // do div class entry
                message = {
                    content : find_entry_content(),
                    'author_data' : author_data
                }
                //console.log(message)
                
            break;


            case "stories":
            // TODO
            // this is a little silly
                if(matches[2] === "new" || matches[2] === "drafts" || matches[2] === "recent" || matches[2] === "active" || matches[2] === "popular") return;
                //console.log("standard story")

                message = {
                    content : find_entry_content(),
                    'author_data' : author_data
                }
                //console.log(message)                
                
                // TODO
                // stuff like send and analyze and load widget
            break;

            case "new":
                //console.log("new ficly post... we'll wait till your ready for the public to say anything")
                //

            break;

            case "authors":
                //console.log("author page")
                if(matches[3]) return;
                // who is this author?
                // var hcard = document.getElementById("hcard");
                // if(hcard) {
                //     var tmp;
                //     try{
                //         tmp = hcard.getElementsByTagName("h1")[0].getElementsByTagName("a")[0].getAttribute("href");                        
                //     } catch(e) {}
                // 
                //     if(tmp) story_feed_url = tmp + "/stories.atom";
                // }
                message = {
                    'action' : 'injectAuthorWidget',
                    'author_url' : document.location.protocol + "//" + document.location.hostname + document.location.pathname
                }
            
            break;

            case "edit":
                console.log("currently editing piece, let's not judge")
                // TODO
                // everything
            break;

            default:
                message = {};
                // skipping ficly.com homepage & ficly.com/blog homepage (and lots of other stuff probaby)
            break;
        }        
        
        
        console.log(message, "page info")
        return message;
}

function find_vcard() {
    var  lis = document.getElementsByTagName('li');
    
    for(var i=0; i<lis.length; i++) {
        if(lis[i].className === "vcard") {
            var elem = lis[i].getElementsByTagName('a')[0],
                current_user = elem.innerHTML
            //console.log(current_user, typeof current_user, elem.getAttribute('href'))
            author_data = {
                author : current_user,
                url : elem.getAttribute('href')
            }
            //TODO
            // run the url parse on the href and get additional values if needed to local storage
        }
        break;
        
    }
}

function phoneHome( message ) {
    chrome.extension.sendRequest( message, brain_callback )
    
}

function brain_callback( message ) {
    //console.log(message, "message from the brain to message_dispatcher.js")
    //TODO
    // do something with response from brain - maybe make a promo widget?
}

function init() {
    //console.log('i am awake', document.location)

    find_vcard(); // who am I logged in as? 
    var message = analyze_urls();
    if(message) {
        phoneHome( message )
    }

}


init();