var React = require('react');
var Site = require('./Site.js');

module.exports = React.createClass({
	handleOpenSettings: function () {
			routie('settings');
	},
	render: function () {
		
		return (
					<label className={Site.extensionId + "-ui-border " + Site.extensionId + "-ui-hover " + Site.extensionId + "-ui-clickable"} onClick={this.handleOpenSettings} id={Site.extensionId + "-open"}><img src={replace_with_settings_graphic} />{Site.extensionText.button}</label>
				);
	}
});