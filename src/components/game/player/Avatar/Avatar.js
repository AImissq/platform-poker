import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Avatar.css';
import Text from '../Text/Text';
import Rank from '../Rank/Rank';

class Avatar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rank: 25,
			lastAction: 'Fold'
		};
	}

	addCommasToCash = cash => {
		let cashAsString = this.props.cash.toString();
		let cashArray = [];
		for (let i = cashAsString.length; i > 0; i = i - 3) {
			if(i === cashAsString.length) {
				cashArray.unshift(cashAsString.slice(-3));
			}
			else {
				cashArray.unshift(cashAsString.slice(i - cashAsString.length - 3, i - cashAsString.length));
			}
		}
		return '$' + cashArray.join(',');
	}

	render() {
		return (
		<div className='avatar' id=''>
			<img src='http://tilomitra.com/wp-content/uploads/2014/08/avatar-cartoon.png' width='150px' alt='Avatar' />
			<Rank
				rank={this.state.rank}
			/>
			<Text
				content={this.addCommasToCash(this.props.cash)}
				textStyle='p'
			/>
			<Text
				content={this.props.lastAction}
				textStyle='p'
			/>
		</div>
		);
	}
}

Avatar.propTypes = {
};

Avatar.defaultProps = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Avatar);
