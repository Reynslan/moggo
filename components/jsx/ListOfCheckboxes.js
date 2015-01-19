var React = require('react');
var CheckboxWithLabel = require('./CheckboxWithLabel.js');
var Site = require('./Site.js');

module.exports = React.createClass({
	render: function () {
		var items = {};
		var i = 0;
		
		for (var category in this.props.retrievedCategoriesSettings)
		{
			var currentCategory = this.props.retrievedCategoriesSettings[category];

			items['name-' + i++] = (
					<li>
						<CheckboxWithLabel name={currentCategory.category + "_checkbox"} labelOn={currentCategory.name + Site.extensionText.appendToBlockedCategory} labelOff={currentCategory.name} currentSettings={currentCategory}/>
					</li>
				);
		}
		
		return (
					<ul>
						{items}
					</ul>
				);
	}
});