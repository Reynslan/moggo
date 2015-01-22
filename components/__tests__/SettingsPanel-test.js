/** @jsx React.DOM */

jest.dontMock('./../jsx/jestable/SettingsPanel.js');
jest.dontMock('./../jsx/jestable/ListOfCheckboxes.js');
jest.dontMock('./../jsx/jestable/KeywordFilter.js');

describe('SettingsPanel', function() {
    it('shows ListOfCheckboxes, KeywordFilter and buttons for save and cancel', function() {
        var React = require('react/addons');
        var SettingsPanel = require('./../jsx/jestable/SettingsPanel.js');
        var ListOfCheckboxes = require('./../jsx/jestable/ListOfCheckboxes.js');
        var KeywordFilter = require('./../jsx/jestable/KeywordFilter.js');
        var Site = require('./../jsx/jestable/Site.js');
        var Ids = require('./../jsx/jestable/Ids.js');
        var TestUtils = React.addons.TestUtils;

        // Render a SettingsPanel
        var settingsPnl = TestUtils.renderIntoDocument(
            <SettingsPanel retrievedSettings={ {} }/>
        );

        // Verify that it contains a list for checkboxes and form for keyword entry
        var checkboxlist = TestUtils.findRenderedComponentWithType(settingsPnl, ListOfCheckboxes);
        expect(checkboxlist.getDOMNode().nodeName).toEqual('UL');
        
        var keywordFltr = TestUtils.findRenderedComponentWithType(settingsPnl, KeywordFilter);
        expect(keywordFltr.getDOMNode().nodeName).toEqual('DIV');
        expect(keywordFltr.getDOMNode().lastChild.nodeName).toEqual('FORM');
        
        // Verify that it contains save and cancel buttons
        var saveAndCancelBtns = TestUtils.scryRenderedDOMComponentsWithClass(settingsPnl, Ids.extension + "-ui-clickable");
        var saveBtn = saveAndCancelBtns[0];
        var cancelBtn = saveAndCancelBtns[1];
        
        expect(saveBtn.getDOMNode().textContent).toEqual(Site.extensionText.save);
        expect(cancelBtn.getDOMNode().textContent).toEqual(Site.extensionText.cancel);
        
    });
});
