/*
 * extension.js - contains your code to be run on page load
 *
 */
 
(function() {

    //Site specific variables and methods
    var Site = require('./Site.js');
    var Routed = require('./Routed_replace_with_Browser_.js');
    
    var Ids = require('./Ids.js');
    var Css = require('./Css.js');

    //Adding appropriate class to elements in blockable categories
    Site.addCategoryClasses();
    
    //Add id attribute to all news and get text to be able to match keywords
    var allNewsText = Site.addNewsIdsAndGetText();
    
    //Insert element for extension to mount
    var nodeForExtension = document.createElement("span");
    nodeForExtension.id = Ids.extension;
    var nodeMainContent = document.getElementById(Ids.content);
    var parentDiv = nodeMainContent.parentNode;
    parentDiv.insertBefore(nodeForExtension, nodeMainContent);
    
    routie({
        'settings': function() {
            Routed.toSettings();
        },
        '': function() {
            Routed.toMain(allNewsText);
        }
    });
})();