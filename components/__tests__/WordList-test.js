/** @jsx React.DOM */

jest.dontMock('./../jsx/jestable/WordList.js');
jest.dontMock('./../jsx/jestable/DeleteButton.js');

describe('WordList', function() {
    it('creates a list of keywords', function() {
        var React = require('react/addons');
        var WordList = require('./../jsx/jestable/WordList.js');
        var TestUtils = React.addons.TestUtils;

        // Render a WordList
        var wordlist = TestUtils.renderIntoDocument(
            <WordList items={ ['keyword1', 'keyword2'] } handleDelete={ jest.genMockFn() }/>
        );

        // Verify that it's created a list with the correct number of items and the correct items.
        var list = TestUtils.findRenderedDOMComponentWithTag(wordlist, 'ul');
        expect(list.getDOMNode().firstChild.textContent).toEqual('keyword1 ');
        expect(list.getDOMNode().lastChild.textContent).toEqual('keyword2 ');
    });
});
