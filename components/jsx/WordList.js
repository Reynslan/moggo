var React = require('react');
var DeleteButton = require('./DeleteButton.js');

module.exports = React.createClass({
    
    createItem: function(itemText, i) {
        return (
                    <li key={i++} className="keyword_item">{itemText} <DeleteButton handleDelete={this.props.handleDelete} itemText={itemText} idNumber={i}/></li>
                );
    },

    render: function() {
        var i = 0;
        return (
                    <ul>{this.props.items.map(this.createItem, i)}</ul>
                );
    }
    
});
