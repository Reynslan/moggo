var React = require('react');
var CheckboxWithLabel = require('./CheckboxWithLabel.js');

module.exports = React.createClass({
	render: function () {
		var items = {};
		var i = 0;
		
		for (var categoryObject in this.props.retrievedCategoriesSettings)
		{
			var currentCategoryObj = this.props.retrievedCategoriesSettings[categoryObject];

			items['name-' + i++] = (
					<li>
						<CheckboxWithLabel name={currentCategoryObj.category + "_checkbox"} labelOn={currentCategoryObj.name + " - blokkað"} labelOff={currentCategoryObj.name} currentSettings={currentCategoryObj}/>
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