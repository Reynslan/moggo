var React = require('react');
var _ = require('lodash');
var WordList = require('./WordList.js');
var Site = require('./Site.js');

module.exports = React.createClass({
    getInitialState: function() {
        return  {
                    items: this.props.keywords,
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
        //User possibly copy and pastes text with soft hyphens, remove them.
        var textMinusSoftHyphens = this.state.text.replace(/[\u00AD]+/g,'');
        var nextItems = this.state.items.concat([textMinusSoftHyphens]);
        var nextText = '';
        this.setState({items: nextItems, text: nextText});
        }
    },
    render: function() {
        return  (
                    <div>
                        <WordList items={this.state.items} handleDelete={this.handleDelete}/>
                        <form onSubmit={this.handleSubmit}>
                            <input id={Site.extensionId + "-keyword-input"} onChange={this.onChange} value={this.state.text} />
                            <img id={Site.extensionId + "-addbutton"} src={replace_with_addcircle_graphic} onClick={this.handleSubmit} className={Site.extensionId + "-clickable"}/>
                        </form>
                    </div>
                );
    }
});