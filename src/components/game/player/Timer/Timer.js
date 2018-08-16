import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
	render() {
		return (
			<div className='timer' id=''>
				<p>{ this.props.timer }</p>
			</div>
		);
	}
}

export default Timer;
