var React = require('react');
var Site = require('./Site.js');
var Ids = require('./Ids.js');

module.exports = React.createClass({
    handleOpenSettings: function () {
            routie('settings');
    },
    render: function () {
        
        return (
                    <label className={Ids.extension + "-ui-border " + Ids.extension + "-ui-hover " + Ids.extension + "-ui-clickable"}
                    onClick={this.handleOpenSettings}
                    id={Ids.extension + "-open"}>
                    <img src={replace_with_settings_graphic} />
                    {Site.extensionText.button}
                    </label>
                );
    }
});