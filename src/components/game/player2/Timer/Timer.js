import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
	render() {
		return (
			<div className='timer' id=''>
				<p>{ this.props.time }</p>
			</div>
		);
	}
}

export default Timer;
