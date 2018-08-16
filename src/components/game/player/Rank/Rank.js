import React, { Component } from 'react';
import './Rank.css';

class Rank extends Component {
	render() {
		return (
			<div className='rank' id=''>
                <p>RANK</p>
				<h1>{this.props.rank}</h1>
			</div>
		);
	}
}

export default Rank;
