/*
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
        iwl_link = make("a");
    
    iwl_link.setAttribute("href", response_data.base_urls.permalink + response_data.link)
    iwl_link.setAttribute("target", "new")    
    iwl_link.innerHTML = "Analyzed by iwl.me"
    h1.innerHTML = "In the style of " + response_data.author;
    
    
    
    var parent = find_widget_parent();
    
    d.appendChild( h1 );
    d.appendChild( iwl_link )
    parent.appendChild( d );
}


// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//     // make the widget NOW!
//     makeWidget();
// });
chrome.extension.sendRequest({'action' : 'buildWidget'}, makeWidget)




/// at the end of this file, open a send request? 