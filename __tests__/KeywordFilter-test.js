/** @jsx React.DOM */

jest.dontMock('./../components/jsx/KeywordFilter.js');
jest.dontMock('./../components/jsx/WordList.js');

describe('KeywordFilter', function() {
	it('creates a list of keywords and an input for keywords', function() {
		var React = require('react/addons');
		var KeywordFilter = require('./../components/jsx/KeywordFilter.js');
		var WordList = require('./../components/jsx/WordList.js');
		var Site = require('./../components/jsx/Site.js');
		var TestUtils = React.addons.TestUtils;

		// Render a keywordsfilter component in the document
		var keywordsComponent = TestUtils.renderIntoDocument(
			<KeywordFilter keywords={['keyword1', 'keyword2']}/>
		);

		// Verify that it's created a list with the correct number of items and the correct items.
		var list = TestUtils.findRenderedDOMComponentWithTag(keywordsComponent, 'ul');
		expect(list.getDOMNode().firstChild.textContent).toEqual('keyword1 ');
		expect(list.getDOMNode().lastChild.textContent).toEqual('keyword2 ');
		
		// Type in new keyword, submit it and verify it's added to the list
		var form = TestUtils.findRenderedDOMComponentWithTag(keywordsComponent, 'form');
		var input = TestUtils.findRenderedDOMComponentWithTag(keywordsComponent, 'input');
		TestUtils.Simulate.change(input, {target: {value: 'keyword3'}});
		TestUtils.Simulate.submit(form);
		expect(list.getDOMNode().lastChild.textContent).toEqual('keyword3 ');
	});
});
