var React = require('react');
var ListOfCheckboxes = require('./ListOfCheckboxes.js');
var KeywordFilter = require('./KeywordFilter.js');
var Site = require('./Site.js');

module.exports = React.createClass({
    handleSaveSettings: function () {
        var categoriesSettings = Site.scrapeCategoriesSettings();
        var keywordsElements = document.getElementsByClassName("keyword_item");
        var keywords = [];
        
        for (var i = 0; i < keywordsElements.length; i++)
        {
            keywords.push(keywordsElements[i].textContent.trim().toLowerCase());
        }
        
        var settings = {
            categories : categoriesSettings,
            keywords : keywords
        };
        
        BabelExt.storage.set(Site.extensionId + "Settings", JSON.stringify(settings), function() {});
        
        routie('');
    },
    handleCancelSettings: function () {
        routie('');
    },
    render: function () {
    
        return  (
                    <div>
                        <h1>{Site.extensionText.settingsHeading}</h1>
                        <label onClick={this.handleSaveSettings} id={Site.extensionId + "-save"} className={Site.extensionId + "-ui-border " + Site.extensionId + "-ui-hover " + Site.extensionId + "-ui-clickable"}><img src={replace_with_save_graphic} />{Site.extensionText.save}</label>
                        <label onClick={this.handleCancelSettings} id={Site.extensionId + "-cancel"} className={Site.extensionId + "-ui-border " + Site.extensionId + "-ui-hover " + Site.extensionId + "-ui-clickable"}><img src={replace_with_cancel_graphic} />{Site.extensionText.cancel}</label>
                        <h3>{Site.extensionText.categoriesHeading}</h3>
                        <ListOfCheckboxes retrievedCategoriesSettings={this.props.retrievedSettings.categories}/>
                        <h3>{Site.extensionText.keywordsHeading}</h3>
                        <KeywordFilter keywords={this.props.retrievedSettings.keywords}/>
                    </div>
                );
    }
});