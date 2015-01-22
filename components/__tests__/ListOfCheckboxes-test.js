/** @jsx React.DOM */

jest.dontMock('./../jsx/jestable/ListOfCheckboxes.js');
jest.dontMock('./../jsx/jestable/CheckboxWithLabel.js');

describe('ListOfCheckboxes', function() {
    it('creates a list of CheckboxesWithLabel', function() {
        var React = require('react/addons');
        var ListOfCheckboxes = require('./../jsx/jestable/ListOfCheckboxes.js');
        var CheckboxWithLabel = require('./../jsx/jestable/CheckboxWithLabel.js');
        var Site = require('./../jsx/jestable/Site.js');
        var TestUtils = React.addons.TestUtils;

        // Render a list of checkboxes with label in the document
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
