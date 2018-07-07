import React, { Component } from 'react';
import './Avatar.css';
import Text from '../Text/Text';
import Rank from '../Rank/Rank';

class Avatar extends Component {
	render() {
		return (
		<div className='avatar' id=''>
			<img src='http://tilomitra.com/wp-content/uploads/2014/08/avatar-cartoon.png' width='150px' alt='Avatar' />
			<Rank
				rank='25'
			/>
			<Text
				content='$25,000'
				textStyle='p'
			/>
			<Text
				content='Fold'
				textStyle='p'
			/>
		</div>
		);
	}
}

export default Avatar;
