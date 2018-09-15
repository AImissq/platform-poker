import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import {
	addToMainPot,
	// addToSidepotOne,
	// addToSidepotTwo,
	// addToSidepotThree
} from '../../../actions/potActions';

import './PlayerControlsContainer.css';

class PlayerControlsContainer extends Component {
	handleCheck = () => {
		console.log('check running');
		console.log('checkAction: ', this.props.checkAction);
		console.log('playerInfo: ', this.props.playerInfo);
		this.props.checkAction(this.props.playerInfo);
	}

	handleCall = () => {
		this.props.callAction(this.props.playerInfo);
	}

	handleRaise = () => {
		this.props.raiseAction(this.props.playerInfo);
	}

	render() {
		const wellStyles = { maxWidth: 125, margin: '0 auto 10px' };

		const buttonsInstance = (
			<div className="well" style={wellStyles}>
				<Button bsStyle="primary" bsSize="large" block onClick={this.handleCheck}>
					Check
				</Button>
				<Button bsStyle="success" bsSize="large" block onClick={this.handleCall}>
					Call
				</Button>
				<Button bsStyle="success" bsSize="large" block onClick={this.handleRaise}>
					Raise
				</Button>
				<Button bsStyle="danger" bsSize="large" block>
					Fold
				</Button>
			</div>
		);

		return (
			<div className='playerControlsContainer'>
				{buttonsInstance}
			</div>
		);
	}
}

PlayerControlsContainer.propTypes = {
	addToMainPot: PropTypes.func.isRequired,
	pot: PropTypes.object
};

PlayerControlsContainer.defaultProps = {
	pot: {
		main: {
			amount: 0,
			players: [],
			full: false
		},
		sidepotOne: {
			amount: 0,
			players: [],
			full: false
		},
		sidepotTwo: {
			amount: 0,
			players: [],
			full: false
		},
		sidepotThree: {
			amount: 0,
			players: [],
			full: false
		}
	}
};

const mapStateToProps = state => ({
	pot: state.pot
});

export default connect(mapStateToProps, {addToMainPot})(PlayerControlsContainer);
