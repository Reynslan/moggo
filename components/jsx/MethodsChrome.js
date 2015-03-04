var Ids = require('./Ids.js');

module.exports = {
    mainPanelCss : function() {
        return "#" + Ids.content + " { display: block; } #" + Ids.extension + "-open {margin-left:83%;} ." + Ids.extension + "-ui-border {border-radius: 6px;  border: 1px solid; padding: 0.2em; margin: 0.2em} ." + Ids.extension + "-ui-hover:hover {background-color: #bfbfbf;} ." + Ids.extension + "-ui-clickable:hover {cursor: pointer;}";
    },
    
    blockByKeywords : function(keywords, allNewsText) {
        for (var i = 0; i < keywords.length; i++)
        {
            for(var j = 0; j < allNewsText.length; j++)
            {
                if (allNewsText[j].indexOf(keywords[i]) != -1)
                {
                    BabelExt.css.add("#" + Ids.extension + "-id-" + j + " { display: none; }");
                }
            }
        }
    },
    
    blockByCategory : function(categoriesSettings) {
        for (var categoryObject in categoriesSettings)
        {
            var currentCategory = categoriesSettings[categoryObject];

            if (currentCategory.isBlocked)
            {
                BabelExt.css.add("." + Ids.extension + "-" + currentCategory.category + ", .theme_" + currentCategory.category + " { display: none; }");
                BabelExt.css.add(".padding div div .dategroup .headlines li a[href^='/" + currentCategory.category +"/'] { display: none; }");
                BabelExt.css.add("#helstu-frettir .dategroup .headlines li a[href^='/" + currentCategory.category +"/'] { display: none; }");
            }
            else
            {
                BabelExt.css.add("." + Ids.extension + "-" + currentCategory.category + ", .theme_" + currentCategory.category + "{ display: block; }");
                BabelExt.css.add(".padding div div .dategroup .headlines li a[href^='/" + currentCategory.category +"/'] { display: inline; }");
                BabelExt.css.add("#helstu-frettir .dategroup .headlines li a[href^='/" + currentCategory.category +"/'] { display: inline; }");
            }
        }
    },
    
    save : function(settings) {
        BabelExt.storage.set(Ids.extension + "Settings", JSON.stringify(settings), function() {});
    }
};