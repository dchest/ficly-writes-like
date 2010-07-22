
/*
    Load this on all ficly.com pages, send messages as needed via a port... 
    though this only really runs once, so a send request would be fine...
    
    var port = chrome.extension.connect({ "name" : "story"})
*/




function url_parse() {
    var url_pattern = "\/([a-zA-Z]{2,})\/([a-zA-Z0-9\-_]{2,})\/?([a-zA-Z]{2,})?",
        regex = new RegExp( url_pattern ),
        matches = document.location.pathname.match(regex);
        
    return matches;
}

function find_entry_content() {
    //return document.getElementsByClassName('entry-content')[0].innerHTML
    var content = document.getElementsByClassName('entry-content')[0];
    var graphs = content.getElementsByTagName("p");
    var data = [];
    
    // reformat the data a little bit, iwl.me is sensitive about HTML sometimes
    /*
        Strong Test Case:
        http://ficly.com/stories/19409
            copy paste results are Ursula K. Le Guin
            
            
            Getting Back: Arthur C. Clarke
            
            // avoid overfitting
            
    */
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
        console.log("matches", matches)
        var page_type = matches && matches[1] || null
        if(page_type === null) {
            console.log("not a page to worry about, bail")
            return;
        }
        switch( page_type ) {

            case "blog":
                console.log("this is a blog post, grab the page data and commence the testing of this snippet to iwl.me")
                // do div class entry
                message = {
                    content : find_entry_content()
                }
                console.log(message)
                
            break;


            case "stories":
                if(matches[2] === "new" || matches[2] === "drafts") return;
                console.log("standard story")

                message = {
                    content : find_entry_content()
                }
                console.log(message)                
                
                // TODO
                // stuff like send and analyze and load widget
            break;

            case "new":
                console.log("new ficly post... do nothing?? -- have a text area")
                //

            break;

            case "edit":
                console.log("currently editing piece (will have text area)")
                // TODO
                // everything
            break;

            default:
                console.log("fall throw")
                message = {};
                // skipping ficly.com homepage & ficly.com/blog homepage (and lots of other stuff probaby)
            break;
        }        
        
        
        
        return message;
}

function find_vcard() {
    var  lis = document.getElementsByTagName('li');
    
    for(var i=0; i<lis.length; i++) {
        if(lis[i].className === "vcard") {
            var elem = lis[i].getElementsByTagName('a')[0],
                current_user = elem.innerHTML
            console.log(current_user, typeof current_user, elem.getAttribute('href'))
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
    console.log(message)
}

function init() {
    console.log('i am awake', document.location)
    
    // find vcard
    // use pathname: document.location.pathname
//    var url_pattern = "\/(blog)\/[a-zA-Z0-9\-]{2,}|\/(stories)\/[0-9]{1,10}|\/stories\/(new)|/stories/[0-9]{1,10}/(edit)|\/(authors)/[a-zA-Z]"

    var message = analyze_urls();
    if(message) {
        phoneHome( message )
    }
    find_vcard();
}


init();