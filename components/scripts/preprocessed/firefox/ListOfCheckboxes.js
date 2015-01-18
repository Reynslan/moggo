var React = require('react');
var CheckboxWithLabel = require('./CheckboxWithLabel.js');

module.exports = React.createClass({displayName: "exports",
	render: function () {
		var items = {};
		var i = 0;
		
		for (var categoryObject in this.props.retrievedCategoriesSettings)
		{
			var currentCategoryObj = this.props.retrievedCategoriesSettings[categoryObject];

			items['name-' + i++] = (
					React.createElement("li", null, 
						React.createElement(CheckboxWithLabel, {name: currentCategoryObj.category + "_checkbox", labelOn: currentCategoryObj.name + " - blokkað", labelOff: currentCategoryObj.name, currentSettings: currentCategoryObj})
					)
				);
		}
		
		return (
					React.createElement("ul", null, 
						items
					)
				);
	}
});