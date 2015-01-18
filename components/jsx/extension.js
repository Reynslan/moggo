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
			BabelExt.storage.get(Site.extensionId + "Settings", function(extensionSettings)
			{
				React.render(<SettingsPanel retrievedSettings={JSON.parse(extensionSettings.value)}/>, 
					document.getElementById(Site.extensionId));
			});
        },
        '': function() {
			BabelExt.storage.get(Site.extensionId + "Settings", function(extensionSettings)
			{
				if (extensionSettings.value !== undefined && extensionSettings.value !== null)
				{
					React.render(<MainPanel retrievedSettings={JSON.parse(extensionSettings.value)} allNewsText={allNewsText}/>, 
						document.getElementById(Site.extensionId));
				}
				else
				{
					BabelExt.storage.set(Site.extensionId + "Settings", JSON.stringify(Site.initSettings), function() {});
					
					React.render(<MainPanel	retrievedSettings={Site.initSettings} allNewsText={allNewsText}/>, 
						document.getElementById(Site.extensionId));
				}
			});
        }
    });
})();