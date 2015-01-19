var React = require('react');
var Site = require('./Site.js');

module.exports = React.createClass({
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
                <label className={Site.extensionId + "-ui-clickable"} id={this.props.name}>
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