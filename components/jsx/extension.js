/*
 * extension.js - contains your code to be run on page load
 *
 */
 
(function(u) {

	var React = require('react');
	
	var MainPanel = require('./MainPanel.js');
	var SettingsPanel = require('./SettingsPanel.js');
	
	var Site = require('./Site.js');
	
	//Adding appropriate class to elements in blockable categories
	Site.addCategoryClasses();
	
	//Add id attribute to all news and get text to be able to match keywords
	var allNewsText = Site.addNewsIdsAndGetText();
	
	//Insert element for extension to mount
	var nodeForExtension = document.createElement("span");
	nodeForExtension.id = Site.extensionId;
	var nodeMainContent = document.getElementById(Site.contentId);
	var parentDiv = nodeMainContent.parentNode;
	parentDiv.insertBefore(nodeForExtension, nodeMainContent);
	
	routie({
        'settings': function() {
			BabelExt.css.add("#" + Site.contentId + "{ display: none; }");
			BabelExt.css.render();
			
			BabelExt.storage.get(Site.extensionId + "Settings", function(extensionSettings)
			{
				React.render(<SettingsPanel retrievedSettings={JSON.parse(extensionSettings.value)}/>, 
					document.getElementById(Site.extensionId));
			});
        },
        '': function() {
			BabelExt.css.add(Site.mainPanelCss());
			
			BabelExt.storage.get(Site.extensionId + "Settings", function(extensionSettings)
			{
				if (extensionSettings.value !== undefined && extensionSettings.value !== null)
				{
					Site.blockByKeywords(JSON.parse(extensionSettings.value).keywords, allNewsText);
					Site.blockByCategory(JSON.parse(extensionSettings.value).categories);
					
					React.render(<MainPanel/>,
						document.getElementById(Site.extensionId));
				}
				else
				{
					Site.blockByKeywords(Site.initSettings.keywords, allNewsText);
					Site.blockByCategory(Site.initSettings.categories);
					
					BabelExt.storage.set(Site.extensionId + "Settings", JSON.stringify(Site.initSettings), function() {});
					
					React.render(<MainPanel/>,
						document.getElementById(Site.extensionId));
				}
				
				BabelExt.css.render();
			});
        }
    });
})();