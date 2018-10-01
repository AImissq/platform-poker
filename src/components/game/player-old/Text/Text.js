import React, { Component } from 'react';
import './Text.css';

class Text extends Component {
	render() {
		const styledContent = () => {
			switch(this.props.textStyle) {
				case 'h1':
					return (<h1>{this.props.content}</h1>);
				case 'h2':
					return (<h2>{this.props.content}</h2>);
				default:
					return (<p>{this.props.content}</p>);
			}
		}

		return (
			<div className='text' id=''>
				{ styledContent() }
			</div>
		);
	}
}

export default Text;
