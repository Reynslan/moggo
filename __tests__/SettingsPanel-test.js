/** @jsx React.DOM */

jest.dontMock('./../components/jsx/SettingsPanel.js');
jest.dontMock('./../components/jsx/ListOfCheckboxes.js');
jest.dontMock('./../components/jsx/KeywordFilter.js');

describe('SettingsPanel', function() {
	it('shows ListOfCheckboxes, KeywordFilter and buttons for save and cancel', function() {
		var React = require('react/addons');
		var SettingsPanel = require('./../components/jsx/SettingsPanel.js');
		var ListOfCheckboxes = require('./../components/jsx/ListOfCheckboxes.js');
		var KeywordFilter = require('./../components/jsx/KeywordFilter.js');
		var Site = require('./../components/jsx/Site.js');
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
		var saveAndCancelBtns = TestUtils.scryRenderedDOMComponentsWithClass(settingsPnl, Site.extensionId + "-ui-clickable");
		var saveBtn = saveAndCancelBtns[0];
		var cancelBtn = saveAndCancelBtns[1];
		
		expect(saveBtn.getDOMNode().textContent).toEqual(Site.extensionText.save);
		expect(cancelBtn.getDOMNode().textContent).toEqual(Site.extensionText.cancel);
		
	});
});
