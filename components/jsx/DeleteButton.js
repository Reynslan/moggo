var React = require('react');
var Site = require('./Site.js');
var Ids = require('./Ids.js');

module.exports = React.createClass({
    render: function() {
        return (
                    <img className={Ids.extension + "-ui-clickable"} onClick={this.props.handleDelete.bind(null, this.props.itemText)} src={replace_with_delete_graphic} id={Ids.extension + "-keyword-" + this.props.idNumber}/>
                );
    }
});