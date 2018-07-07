import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
	render() {
		return (
			<div className='timer' id=''>
				{ this.props.time }
			</div>
		);
	}
}

export default Timer;
