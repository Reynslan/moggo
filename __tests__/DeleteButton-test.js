/** @jsx React.DOM */

jest.dontMock('./../components/jsx/DeleteButton.js');

describe('DeleteButton', function() {
    it('creates a button that deletes keyword from the keyword list', function() {
        var React = require('react/addons');
        var DeleteButton = require('./../components/jsx/DeleteButton.js');
        var Site = require('./../components/jsx/Site.js');
        var TestUtils = React.addons.TestUtils;
        var mockDelete = jest.genMockFn();

        // Render a delete button in the document
        var deleteBtn = TestUtils.renderIntoDocument(
            <DeleteButton handleDelete={ mockDelete } itemText={ "itemText" } idNumber={0}/>
        );

        // Verify that it has the correct id and class attributes
        var btn = TestUtils.findRenderedDOMComponentWithTag(deleteBtn, 'img');
        expect(btn.getDOMNode().id).toEqual(Site.extensionId + "-keyword-" + 0);
        expect(btn.getDOMNode().className).toEqual(Site.extensionId + "-ui-clickable");

        // Simulate a click and verify that it calls delete function
        TestUtils.Simulate.click(btn);
        expect(mockDelete.mock.calls.length).toBe(1);
    });
});
