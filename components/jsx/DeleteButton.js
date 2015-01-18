var React = require('react');
var Site = require('./Site.js');

module.exports = React.createClass({
	render: function() {
		return (
					<img className={Site.extensionId + "-ui-clickable"} onClick={this.props.handleDelete.bind(null, this.props.itemText)} src={replace_with_delete_graphic} id={Site.extensionId + "-keyword-" + this.props.idNumber}/>
				);
	}
});