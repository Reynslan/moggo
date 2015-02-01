//mbl.is

var Sizzle = require('sizzle');
var Methods = require('./Methods_replace_with_Browser_');
var Ids = require('./Ids.js');

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
    
    newsItemsSelector : ".topnews, .adalfrett, .teaser, .dategroup .headlines li a",
    
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
            var blockableElements = Sizzle(".teaser:has(a[href^='/" + this.categories[i] +"/']), .topnews:has(a[href^='/" + this.categories[i] +"/']), .adalfrett:has(a[href^='/" + this.categories[i] +"/']), .dlk-12 .headlines:has(a[href^='/" + this.categories[i] +"/'])");
            
            for (var j = 0; j < blockableElements.length; j++)
            {
                blockableElements[j].className += " " + Ids.extension + "-" + this.categories[i];
            }
        }
    },
    
    addNewsIdsAndGetText : function() {
        var allNewsItems = document.body.querySelectorAll(this.newsItemsSelector);
        var allNewsItems_text = [];
        
        for (var k = 0; k < allNewsItems.length; k++)
        {
            allNewsItems_text.push(allNewsItems[k].textContent.replace(/[\u00AD]+|Meira\s*$/g,'').toLowerCase());
            allNewsItems[k].id = Ids.extension + "-id-" + k;
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
    
    //Browser specific methods
    mainPanelCss : Methods.mainPanelCss,
    blockByKeywords : Methods.blockByKeywords,
    blockByCategory : Methods.blockByCategory
};