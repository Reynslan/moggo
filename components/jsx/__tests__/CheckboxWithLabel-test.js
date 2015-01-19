/** @jsx React.DOM */

jest.dontMock('./../CheckboxWithLabel.js');

describe('CheckboxWithLabel', function() {
    it('changes the text and checked value after click', function() {
        var React = require('react/addons');
        var CheckboxWithLabel = require('./../CheckboxWithLabel.js');
        var TestUtils = React.addons.TestUtils;

        // Render a checkbox with label in the document
        var checkbox = TestUtils.renderIntoDocument(
            <CheckboxWithLabel labelOn="On" labelOff="Off" currentSettings={ {category : {isBlocked : false}} }/>
        );

        // Verify that it's labeled Off and checked is false by default
        var label = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'label');
        expect(label.getDOMNode().textContent).toEqual('Off');
        expect(label.getDOMNode().firstChild.checked).toEqual(false);

        // Simulate a click and verify that it is now labeled On and checked is true
        var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
        TestUtils.Simulate.change(input);
        expect(label.getDOMNode().textContent).toEqual('On');
        expect(label.getDOMNode().firstChild.checked).toEqual(true);
    });
});
