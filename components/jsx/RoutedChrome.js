var React = require('react');
var Site = require('./Site.js');
var Ids = require('./Ids.js');

//React components
var MainPanel = require('./MainPanel.js');
var SettingsPanel = require('./SettingsPanel.js');

module.exports = {
    toSettings : function() {
        BabelExt.css.add("#" + Ids.content + "{ display: none; }");
        BabelExt.css.render();
        
        BabelExt.storage.get(Ids.extension + "Settings", function(extensionSettings)
        {
            React.render(<SettingsPanel retrievedSettings={JSON.parse(extensionSettings.value)}/>, 
                document.getElementById(Ids.extension));
        });
    },
    
    toMain : function(allNewsText) {
        BabelExt.css.add(Site.mainPanelCss());
        
        BabelExt.storage.get(Ids.extension + "Settings", function(extensionSettings)
        {
            if (extensionSettings.value !== undefined && extensionSettings.value !== null)
            {
                Site.blockByKeywords(JSON.parse(extensionSettings.value).keywords, allNewsText);
                Site.blockByCategory(JSON.parse(extensionSettings.value).categories);
                
                React.render(<MainPanel/>,
                    document.getElementById(Ids.extension));
            }
            else
            {
                Site.blockByKeywords(Site.initSettings.keywords, allNewsText);
                Site.blockByCategory(Site.initSettings.categories);
                
                BabelExt.storage.set(Ids.extension + "Settings", JSON.stringify(Site.initSettings), function() {});
                
                React.render(<MainPanel/>,
                    document.getElementById(Ids.extension));
            }
            
            BabelExt.css.render();
        });
    }
};