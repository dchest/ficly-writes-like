/*
    Rough little script to process wikipedia results
    
    
*/
var parseWikiText_patterns = {};
//TODO
// refactor to remove the global variable, Google Chrome Question, will attaching to a window work? 
// What happens if they open a new window
(function() {
    
    console.log("loading wiki parse file")
    var pattern = new RegExp(/\[\[([^\]\]]{2,})?\]\]/mgi),
        comment_pattern = new RegExp(/(<!--(.*)?-->)/mgi),
        ref_pattern = new RegExp(/(<ref([^>]*)?>([^<]*)?<\/ref>)?/mgi),
        sup_pattern = new RegExp(/(<sup([^>]*)?>([^<]*)?<\/sup>)?/mgi),
        pattern_2 = new RegExp(/''([^'']{2,})?''/mgi),
        pattern_3 = new RegExp(/\{\{([^\}\}]{2,})?\}\}/mgi);    
        
    if(parseWikiText_patterns.links) return;    
    parseWikiText_patterns = {
        
        'links' : pattern,
        'comments' : comment_pattern,
        'ref' : ref_pattern,
        'sup' : sup_pattern,
        'italics' : pattern_2,
        'notes' : pattern_3
        
    }
    // compile patterns once
    
    
}());

function parseWikiText( wikitext ) {
    var ru = "http://en.wikipedia.org/wiki/Wikipedia:IPA_for_Russian",
        en = "http://en.wikipedia.org/wiki/Wikipedia:IPA_for_English",
        ru_lang = "http://en.wikipedia.org/wiki/Russian_language",
        old_date = "http://en.wikipedia.org/wiki/Old_Style_and_New_Style_dates",
        repell = "http://en.wikipedia.org/wiki/Wikipedia:Pronunciation_respelling_key",
        pattern = parseWikiText_patterns;
    
    
    /*
         Perform a series of REGEXP to change the wikitext into presentation quality.
             - Drop the TOC
             - Drop photo and extra meta
             - Parse down to main body text
             - Clean out links, citations and references
             - Clean up some foreign language name issues (missing test cases for all)
             
         TODO:
             Refacture this code, it's gross - maybe a yahoo pipe?
                 Upside, only one call, so far 99.9% accuracy for name provided by iwl.me
             
    */
    
    var finaltext = wikitext.replace( pattern.comments, "")
                            .replace( pattern.ref, "")
                            .replace( pattern.sup, "")                                            
                            .replace(pattern.links, function(m, key, value) {
        console.log(m, key, value)
        var splits = key.split("|")
        var display_title = splits[1] || splits[0] 
        var link_string =  '<a target="new" href="http://wikipedia.org/wiki/'; 
            link_string += encodeURIComponent(splits[0]) + '">';
            link_string += display_title+'</a>';
        return link_string;
    }).replace( pattern.italics, function(m, key, value) {
        console.log(m, key, value)
        return '<i>' + key + '</i>'
    }).replace(pattern.notes, function(m, key, value) {
          console.log("matching brackets", m)
          if( key.toLowerCase().indexOf("cite") === 0 ) {
              return "";
          } 
          var bracket_keys = key.split("|");
          var k1 = bracket_keys[0].toLowerCase();
          if(k1 === "pron-en" || k1 === "proneng") {
              return 'pronounced <a href="'+ en +'">/' + bracket_keys[1] + '/</a>'
          }
          
          if( k1 === "ipa-ru") {
              return 'pronounced <a href="'+ru+'">'+ bracket_keys[1]+'</a>'
          }
          
          if(k1 === "lang-ru") {
              return '<a href="'+ru_lang+'">Russion: </a>' + bracket_keys[1];
          }
          
          if(k1 === "ipac-en" || k1 === "audio-ru" || k1 === "cref2") {
              return "";
          }
          
          
          if(k1 === "respell") {
             bracket_keys.shift();
             return '<a href="'+repell+'">' + bracket_keys.join("-") + '</a>' 
          }
          
          //OldStyleDate
          if(k1 === "oldstyledate") {
              bracket_keys.shift();
              var replace_text = "";
              var old_style = bracket_keys.pop();
              
              bracket_keys.splice(1,0,'[<a href="'+old_date+'">O.S.</a> '+old_style+']')
              return bracket_keys.join(" ");
              
          }
          return bracket_keys[bracket_keys.length] || key;
    });
    
    //.replace("\n\n", '</p><p>')
    /*
        I am going to put the graphs is a temp array
    
    */
    var graphs = finaltext.split("\n\n"), word_count = 0, pos=1;
    for(var i=0; i<graphs.length; i++) {
        var words = graphs[i].split(" ")
        word_count += words.length;
        
        
        if(word_count > 80 ) {
            break;
        }
        pos+=1
    }
    finaltext = graphs.slice(0,pos).join("</p><p>")

    
    return '<p>' + finaltext + '</p>';
}