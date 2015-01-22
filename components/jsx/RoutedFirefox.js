var React = require('react');
var Site = require('./Site.js');
var Css = require('./Css.js');
var Ids = require('./Ids.js');

//React components
var MainPanel = require('./MainPanel.js');
var SettingsPanel = require('./SettingsPanel.js');

module.exports = {
    toSettings : function() {
        Css.addStylesheetRules([
            ["#" + Ids.content,
                ["display", "none"]
            ]
        ]);

        self.port.emit('get', {});
        self.on('message', function onMessage(extensionSettings) {
            React.render(<SettingsPanel retrievedSettings={extensionSettings}/>, 
                document.getElementById(Ids.extension));
        });
    },
    
    toMain : function(allNewsText) {
        Css.addStylesheetRules(Site.mainPanelCss());
                    
        self.port.emit('get', {});
        self.on('message', function onMessage(extensionSettings) {
            Site.blockByKeywords(extensionSettings.keywords, allNewsText);
            Site.blockByCategory(extensionSettings.categories);
            
            React.render(<MainPanel/>,
                document.getElementById(Ids.extension));
        });
    }
};