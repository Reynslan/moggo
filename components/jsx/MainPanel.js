var React = require('react');
var Site = require('./Site.js');

module.exports = React.createClass({
	handleOpenSettings: function () {
			BabelExt.css.add("#" + Site.contentId + "{ display: none; }");
			BabelExt.css.render();
			routie('settings');
		},
	render: function () {
			
		BabelExt.css.add(Site.mainPanelCss());
		
		//Check if to block news by keywords
		Site.blockByKeywords(this.props.retrievedSettings.keywords, this.props.allNewsText);
		
		//Check if to block news by category
		Site.blockByCategory(this.props.retrievedSettings.categories);
		BabelExt.css.render();
		
		return (
					<label className={Site.extensionId + "-ui-border " + Site.extensionId + "-ui-hover " + Site.extensionId + "-ui-clickable"} onClick={this.handleOpenSettings} id={Site.extensionId + "-open"}><img src={replace_with_settings_graphic} />{Site.extensionText.button}</label>
				);
	}
});