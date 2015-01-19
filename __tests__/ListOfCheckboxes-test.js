/** @jsx React.DOM */

jest.dontMock('./../components/jsx/ListOfCheckboxes.js');
jest.dontMock('./../components/jsx/CheckboxWithLabel.js');

describe('ListOfCheckboxes', function() {
	it('creates a list of CheckboxesWithLabel', function() {
		var React = require('react/addons');
		var ListOfCheckboxes = require('./../components/jsx/ListOfCheckboxes.js');
		var CheckboxWithLabel = require('./../components/jsx/CheckboxWithLabel.js');
		var Site = require('./../components/jsx/Site.js');
		var TestUtils = React.addons.TestUtils;

		// Render a checkbox with label in the document
		var checkboxlist = TestUtils.renderIntoDocument(
			<ListOfCheckboxes 
			retrievedCategoriesSettings={
				{
					category1 : {
						name : "name1",
						isBlocked : false
					},
					category2 : {
						name : "name2",
						isBlocked : true}
					}
				}
			/>
		);

		// Verify that it's created a list with the correct number of items and the correct items.
		var list = TestUtils.scryRenderedComponentsWithType(checkboxlist, CheckboxWithLabel);
		expect(list.length).toBe(2);
		expect(list[0].getDOMNode().textContent).toEqual("name1");
		expect(list[1].getDOMNode().textContent).toEqual("name2" + Site.extensionText.appendToBlockedCategory);
	});
});
