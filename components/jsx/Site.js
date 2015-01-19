//mbl.is

var Sizzle = require('sizzle');

module.exports = {

    extensionText : {
        button : "Moggó stillingar",
        settingsHeading : "Stillingar",
        categoriesHeading : "Blokka flokk:",
        keywordsHeading : "Blokka það sem inniheldur:",
        appendToBlockedCategory: " - blokkað",
        save : "Vista",
        cancel : "Hætta við"
    },
    
    categories : ["vidskipti", "sport", "folk", "smartland", "bill"],
    
    extensionId : "mbl-extension",
    
    contentId: "main-content",
    
    newsItemsSelector : ".topnews, .adalfrett, .teaser, .dategroup .headlines li a",
    
    mainPanelCss : function() {
    return "#" + this.contentId + " { display: block; } #" + this.extensionId + "-open {margin-left:83%;} ." + this.extensionId + "-ui-border {border-radius: 6px;  border: 1px solid; padding: 0.2em; margin: 0.2em} ." + this.extensionId + "-ui-hover:hover {background-color: #bfbfbf;} ." + this.extensionId + "-ui-clickable:hover {cursor: pointer;}";
    },
    
    initSettings : {
        categories : {
            vidskipti: {
                            name: "Viðskipti",
                            category: "vidskipti",
                            isBlocked: false
            },
            sport: {
                            name: "Íþróttir",
                            category: "sport",
                            isBlocked: false
            },
            folk: {
                            name: "Fólk",
                            category: "folk",
                            isBlocked: false
            },
            smartland: {
                            name: "Smartland",
                            category: "smartland",
                            isBlocked: false
            },
            bill: {
                            name: "Bílar",
                            category: "bill",
                            isBlocked: false
            }
        },
        keywords : []
    },
    
    addCategoryClasses : function() {
        for (var i = 0; i < this.categories.length; i++)
        {
            var blockableElements = Sizzle(".teaser:has(a[href^='/" + this.categories[i] +"/']), .adalfrett:has(a[href^='/" + this.categories[i] +"/']), .dlk-12 .headlines:has(a[href^='/" + this.categories[i] +"/'])");
            
            for (var j = 0; j < blockableElements.length; j++)
            {
                blockableElements[j].className += " " + this.extensionId + "-" + this.categories[i];
            }
        }
    },
    
    addNewsIdsAndGetText : function() {
        var allNewsItems = document.body.querySelectorAll(this.newsItemsSelector);
        var allNewsItems_text = [];
        
        for (var k = 0; k < allNewsItems.length; k++)
        {
            allNewsItems_text.push(allNewsItems[k].textContent.replace(/[\u00AD]+|Meira\s*$/g,'').toLowerCase());
            allNewsItems[k].id = this.extensionId + "-id-" + k;
        }
        return allNewsItems_text;
    },
    
    scrapeCategoriesSettings : function() {
        return {
            vidskipti:  {
                            name: "Viðskipti",
                            category: "vidskipti",
                            isBlocked: document.getElementsByName('vidskipti_checkbox')[0].checked
                        },
            sport:      {
                            name: "Íþróttir",
                            category: "sport",
                            isBlocked: document.getElementsByName('sport_checkbox')[0].checked
                        },
            folk:       {
                            name: "Fólk",
                            category: "folk",
                            isBlocked: document.getElementsByName('folk_checkbox')[0].checked
                        },
            smartland:  {
                            name: "Smartland",
                            category: "smartland",
                            isBlocked: document.getElementsByName('smartland_checkbox')[0].checked
                        },
            bill:       {
                            name: "Bílar",
                            category: "bill",
                            isBlocked: document.getElementsByName('bill_checkbox')[0].checked
                        }   
        };
    },
    
    blockByKeywords : function(keywords, allNewsText) {
        for (var i = 0; i < keywords.length; i++)
        {
            for(var j = 0; j < allNewsText.length; j++)
            {
                if (allNewsText[j].indexOf(keywords[i]) != -1)
                {
                    BabelExt.css.add("#" + this.extensionId + "-id-" + j + " { display: none; }");
                }
            }
        }
    },
    
    blockByCategory : function(categoriesSettings) {
        for (var categoryObject in categoriesSettings)
        {
            var currentCategoryObj = categoriesSettings[categoryObject];

            if (currentCategoryObj.isBlocked)
            {
                BabelExt.css.add("." + this.extensionId + "-" + currentCategoryObj.category + ", .theme_" + currentCategoryObj.category + " { display: none; }");
                BabelExt.css.add(".padding div div .dategroup .headlines li a[href^='/" + currentCategoryObj.category +"/'] { display: none; }");
            }
            else
            {
                BabelExt.css.add("." + this.extensionId + "-" + currentCategoryObj.category + ", .theme_" + currentCategoryObj.category + "{ display: block; }");
                BabelExt.css.add(".padding div div .dategroup .headlines li a[href^='/" + currentCategoryObj.category +"/'] { display: inline; }");
            }
        }
    }
};