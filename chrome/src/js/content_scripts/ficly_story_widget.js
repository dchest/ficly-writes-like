/*
    
    Copyright: See README
    http://github.com/gregory80/ficly-writes-like
    
    This is a story page level widget
        ( or at least it's intended structure)
    
    
    
    Displays
        'Ficly Handle' writes like 'iwl.me response' <-- link to iwl.me affliate code
        
        Wikipedia blurb: Lorem ipsum dolor sit amet, consectetuer adipiscing elit, s
        ed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam e
        rat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        more >> 
        
        Analysis by iwl.me

        
*/

function find_widget_parent() {
    var elem = document.getElementById("secondary-content");
    console.log(elem)
    return elem;
}

function _id( file_id ) {
    return document.getElementById( file_id )
}
function make( type ) {
    return document.createElement( type  )
}

function makeWidget( response_data ) {
    console.log("make the widget", response_data)
    var d = make("div"), 
        h1 = make("h1"),
        d_2 = make("div")
        wiki_content = make("div"), // rename this 
        iwl_link = make("a"),
        iwl_image = chrome.extension.getURL("images/iwl.png"),
        parent = find_widget_parent(),
        img = '<img class="poweredby_image" src="'+iwl_image+'" alt="" border="0" />';
    d.className = "ficly_writes_like_widget"
    // I should use the permalink when this author is you... which I think I can find out...
    iwl_url = response_data.base_urls.share + response_data.link;
    iwl_link.setAttribute("href", iwl_url)
    iwl_link.className = "poweredby_link";
    iwl_link.setAttribute("target", "new")    
    iwl_link.innerHTML = img + " Analyzed by iwl.me"
    h1.innerHTML = "<a target='new' href='"+ iwl_url +"'>Written like " + response_data.author + '</a>';
    if(response_data.wikitext) wiki_content.innerHTML = response_data.wikitext + '<a target="new" href="http://en.wikipedia.org/wiki/'+encodeURIComponent(response_data.author)+'">Read more on Wikipedia</a>'
    
    //d_2.innerHTML = "<a href='"+chrome.extension.getURL("summary.html")+"'>Compare All My Work</a>"
    
    // I should test chaining here later, jquery makes me forget which one it works for...
    d.appendChild( h1 );
    d.appendChild( wiki_content );
    d.appendChild( iwl_link );
    //d.appendChild(d_2);


    parent.appendChild( d );
}

// Phone Home and get Data Needed to populate widget
chrome.extension.sendRequest({'action' : 'buildWidget'}, makeWidget)
