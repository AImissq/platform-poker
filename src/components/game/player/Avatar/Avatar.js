import React, { Component } from 'react';
import './Avatar.css';
import Text from '../Text/Text';
import Rank from '../Rank/Rank';

class Avatar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rank: 25,
			cash: 25000,
			lastAction: 'Fold'
		}
	}

	render() {
		return (
		<div className='avatar' id=''>
			<img src='http://tilomitra.com/wp-content/uploads/2014/08/avatar-cartoon.png' width='150px' alt='Avatar' />
			<Rank
				rank={this.state.rank}
			/>
			<Text
				content={this.state.cash}
				textStyle='p'
			/>
			<Text
				content={this.state.lastAction}
				textStyle='p'
			/>
		</div>
		);
	}
}

export default Avatar;
