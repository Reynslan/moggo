/*
 * extension.js - contains your code to be run on page load
 *
 */
 
(function(u) {
	
	var categories = ["vidskipti", "sport", "folk", "smartland", "bill"];
	
	//Adding appropriate class to elements in blockable categories
	for (var i = 0; i < categories.length; i++)
	{
		var blockableElements = Sizzle(".teaser:has(a[href^='/" + categories[i] +"/']), .adalfrett:has(a[href^='/" + categories[i] +"/']), .dlk-12 .headlines:has(a[href^='/" + categories[i] +"/'])");
		
		for (var j = 0; j < blockableElements.length; j++)
		{
			blockableElements[j].className += " mbl-extension-" + categories[i];
		}
	}

	//Add id attribute to all news and get text without soft hyphens to be able to match keywords	
	var allNewsItems = document.body.querySelectorAll(".topnews, .adalfrett, .teaser, .dategroup .headlines li a");
	var allNewsItems_text = [];
	
	for (var k = 0; k < allNewsItems.length; k++)
	{
		allNewsItems_text.push(allNewsItems[k].textContent.replace(/[\u00AD\u002D\u2011]+|Meira\s*$/g,'').toLowerCase());
		allNewsItems[k].id = "mbl-extension-id-" + k;
	}
	
	//Insert element for extension to mount
	var nodeForExtension = document.createElement("span");
	nodeForExtension.id = "mbl-extension";
	var nodeMainContent = document.getElementById("main-content");
	var parentDiv = nodeMainContent.parentNode;
	parentDiv.insertBefore(nodeForExtension, nodeMainContent);
	
	
	var MainPanel = React.createClass({
		handleOpenSettings: function () {
				BabelExt.css.add("#main-content { display: none; }");
				BabelExt.css.render();
				routie('settings');
			},
        render: function () {
				
			BabelExt.css.add("#main-content { display: block; } #mbl-extension-open {margin-left:83%;} .mbl-extension-ui-border {border-radius: 6px;  border: 1px solid; padding: 0.2em; margin: 0.2em} .mbl-extension-ui-hover:hover {background-color: #bfbfbf;} .mbl-extension-ui-clickable:hover {cursor: pointer;}");
			
			//Check if to show/block news by keywords
			for (var i = 0; i < this.props.retrievedFilteredKeywords.length; i++)
			{
				for(var j = 0; j < this.props.allNewsText.length; j++)
				{
					if (this.props.allNewsText[j].indexOf(this.props.retrievedFilteredKeywords[i]) != -1)
					{
						BabelExt.css.add("#mbl-extension-id-" + j + " { display: none; }");
					}
				}
			}
			
			//Check if to show/block news by category
			for (var categoryObject in this.props.retrievedCategoriesSettings)
			{
				var currentCategoryObj = this.props.retrievedCategoriesSettings[categoryObject];

				if (currentCategoryObj.isBlocked)
				{
					BabelExt.css.add(".mbl-extension-" + currentCategoryObj.category + ", .theme_" + currentCategoryObj.category + " { display: none; }");
					BabelExt.css.add(".padding div div .dategroup .headlines li a[href^='/" + currentCategoryObj.category +"/'] { display: none; }");
				}
				else
				{
					BabelExt.css.add(".mbl-extension-" + currentCategoryObj.category + ", .theme_" + currentCategoryObj.category + "{ display: block; }");
					BabelExt.css.add(".padding div div .dategroup .headlines li a[href^='/" + currentCategoryObj.category +"/'] { display: inline; }");
				}
			   
			}
			BabelExt.css.render();
			
			return (
						<label className="mbl-extension-ui-border mbl-extension-ui-hover mbl-extension-ui-clickable" onClick={this.handleOpenSettings} id="mbl-extension-open"><img src={replace_with_settings_graphic} />moggó stillingar</label>
					);
        }
    });
	
	var CheckboxWithLabel = React.createClass({
		getInitialState: function() {
				return {
					isChecked: this.props.currentSettings.isBlocked
				};
			},
			onChange: function() {
				this.setState({isChecked: !this.state.isChecked});
			},
			render: function() {
				var inputStyle = {
					display: "none"
				};
				return (
					<label className="mbl-extension-ui-clickable">
						<input
							style={inputStyle}
							type="checkbox"
							checked={this.state.isChecked}
							name={this.props.name}
							onChange={this.onChange}
						/>
						<img src={this.state.isChecked ? replace_with_boxchecked_graphic : replace_with_boxblank_graphic} />
						{this.state.isChecked ? this.props.labelOn : this.props.labelOff}
					</label>
				);
			}
	});
	
	var ListOfCheckboxes = React.createClass({
		render: function () {
			var items = {};
			var i = 0;
			
			for (var categoryObject in this.props.retrievedCategoriesSettings)
			{
				var currentCategoryObj = this.props.retrievedCategoriesSettings[categoryObject];

				items['name-' + i++] = (<li><CheckboxWithLabel name={currentCategoryObj.category + "_checkbox"} labelOn={currentCategoryObj.name + " - blokkað"} labelOff={currentCategoryObj.name} currentSettings={currentCategoryObj}/></li>);
			}
			
			return (
						<ul>
							{items}
						</ul>
					);
		}
	});
		
	var WordList = React.createClass({
		
		createItem: function(itemText, i) {
			return <li key={i++} className="keyword_item">{itemText} <DeleteBtn handleDelete={this.props.handleDelete} itemText={itemText} /></li>;
		},

		render: function() {
			var i = 0;
			return (<ul>{this.props.items.map(this.createItem, i)}</ul>);
		}
		
	});
	
	var DeleteBtn = React.createClass({
		render: function() {
			return (
						<img className="mbl-extension-ui-clickable" onClick={this.props.handleDelete.bind(null, this.props.itemText)} src={replace_with_delete_graphic} />
					);
		}
	});

	var KeywordFilter = React.createClass({
		getInitialState: function() {
			return	{
						items: this.props.filteredKeywords,
						text: ''
					};
		},
		handleDelete: function(itemToDelete, e) {
			var newItems = _.reject(this.state.items, function(item) {
				return item == itemToDelete;
			});
			this.setState({items: newItems});
		},
		onChange: function(e) {
			this.setState({text: e.target.value});
		},
		handleSubmit: function(e) {
			if (this.state.text !== "")
			{
			e.preventDefault();
			var nextItems = this.state.items.concat([this.state.text]);
			var nextText = '';
			this.setState({items: nextItems, text: nextText});
			}
		},
		render: function() {
			return	(
						<div>
							<WordList items={this.state.items} handleDelete={this.handleDelete}/>
							<form onSubmit={this.handleSubmit}>
								<input id="mbl-extension-keyword-input" onChange={this.onChange} value={this.state.text} />
								<img id="mbl-extension-addbutton" src={replace_with_addcircle_graphic} onClick={this.handleSubmit} className="mbl-extension-ui-clickable"/>
							</form>
						</div>
					);
		}
	});
	
	var SettingsPanel = React.createClass({
		handleSaveSettings: function (childComponent) {

			var categoriesSettings = {
				vidskipti:	{
								name: "Viðskipti",
								category: "vidskipti",
								isBlocked: document.getElementsByName('vidskipti_checkbox')[0].checked
							},
				sport:		{
								name: "Íþróttir",
								category: "sport",
								isBlocked: document.getElementsByName('sport_checkbox')[0].checked
							},
				folk:		{
								name: "Fólk",
								category: "folk",
								isBlocked: document.getElementsByName('folk_checkbox')[0].checked
							},
				smartland:	{
								name: "Smartland",
								category: "smartland",
								isBlocked: document.getElementsByName('smartland_checkbox')[0].checked
							},
				bill:		{
								name: "Bílar",
								category: "bill",
								isBlocked: document.getElementsByName('bill_checkbox')[0].checked
							}	
			};
			
			var filteredKeywordsElements = document.getElementsByClassName("keyword_item");
			var filteredKeywords = [];
			
			for (var i = 0; i < filteredKeywordsElements.length; i++)
			{
				filteredKeywords.push(filteredKeywordsElements[i].textContent.trim().toLowerCase());
			}
			
			BabelExt.storage.set("categoriesSettings", JSON.stringify(categoriesSettings), function() {});
			BabelExt.storage.set("filteredKeywords", JSON.stringify(filteredKeywords), function() {});
			
			BabelExt.css.add("#main-content { display: block; }");
			BabelExt.css.render();
			routie('');
		},
		handleCancelSettings: function () {
			BabelExt.css.add("#main-content { display: block; }");
			BabelExt.css.render();
			routie('');
		},
        render: function () {
		
            return	(
						<div>
							<h1>Stillingar</h1>
							<label onClick={this.handleSaveSettings} className="mbl-extension-ui-border mbl-extension-ui-hover mbl-extension-ui-clickable"><img src={replace_with_save_graphic} />Vista</label>
							<label onClick={this.handleCancelSettings} className="mbl-extension-ui-border mbl-extension-ui-hover mbl-extension-ui-clickable"><img src={replace_with_cancel_graphic} />Hætta við</label>
							<h3>Blokka flokk:</h3>
							<ListOfCheckboxes retrievedCategoriesSettings={this.props.retrievedCategoriesSettings}/>
							<h3>Blokka það sem inniheldur:</h3>
							<KeywordFilter filteredKeywords={this.props.retrievedFilteredKeywords}/>
						</div>
					);
        }
    });
	
	routie({
        'settings': function() {
			BabelExt.storage.get("categoriesSettings", function(categoriesSettings)
			{	
				BabelExt.storage.get("filteredKeywords", function(filteredKeywords)
				{
					React.render(<SettingsPanel retrievedCategoriesSettings={JSON.parse(categoriesSettings.value)} retrievedFilteredKeywords={JSON.parse(filteredKeywords.value)}/>, 
						document.getElementById('mbl-extension'));
				});
			});
        },
        '': function() {
			BabelExt.storage.get("categoriesSettings", function(categoriesSettings)
			{
				BabelExt.storage.get("filteredKeywords", function(filteredKeywords)
				{
					if (categoriesSettings.value !== undefined && categoriesSettings.value !== null && filteredKeywords.value !== undefined && filteredKeywords.value !== null)
					{
						React.render(<MainPanel retrievedCategoriesSettings={JSON.parse(categoriesSettings.value)} retrievedFilteredKeywords={JSON.parse(filteredKeywords.value)} allNewsText={allNewsItems_text}/>, 
							document.getElementById('mbl-extension'));
					}
					else
					{
						var initCategoriesSettings = {
							vidskipti: {
											name: "Viðskipti",
											category: "vidskipti",
											isBlocked: false
							},
							sport: {
											name: "Íþróttir",
											category: "sport",
											isBlocked: false
							},
							folk: {
											name: "Fólk",
											category: "folk",
											isBlocked: false
							},
							smartland: {
											name: "Smartland",
											category: "smartland",
											isBlocked: false
										},
							bill: {
											name: "Bílar",
											category: "bill",
											isBlocked: false
							}
						};
						
						var initFilteredKeywords = [];
											
						BabelExt.storage.set("categoriesSettings", JSON.stringify(initCategoriesSettings), function() {});
						BabelExt.storage.set("filteredKeywords", JSON.stringify(initFilteredKeywords), function() {});
						
						React.render(<MainPanel	retrievedCategoriesSettings={initCategoriesSettings} retrievedFilteredKeywords={initFilteredKeywords} allNewsText={allNewsItems_text}/>, 
							document.getElementById('mbl-extension'));
					}
				});
			});
        }
    });
	

})();