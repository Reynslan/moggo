/** @jsx React.DOM */

jest.dontMock('./../MainPanel.js');

describe('MainPanel', function() {
    it('creates the main button', function() {
        var React = require('react/addons');
        var MainPanel = require('./../MainPanel.js');
        var Site = require('./../Site.js');
        var TestUtils = React.addons.TestUtils;

        // Render a keywordsfilter component in the document
        var mainPnl = TestUtils.renderIntoDocument(
            <MainPanel/>
        );
        
        mainPnl.handleOpenSettings = jest.genMockFn();

        // Verify that it's created a button for the extension
        var extensionBtn = TestUtils.findRenderedDOMComponentWithTag(mainPnl, 'label');
        expect(extensionBtn.getDOMNode().textContent).toEqual(Site.extensionText.button);
        
    });
});
