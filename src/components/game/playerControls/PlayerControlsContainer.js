import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './PlayerControlsContainer.css';

class PlayerControlsContainer extends Component {
	handleCheck = () => {
		this.props.checkAction(this.props.playerInfo);
	}

	handleCall = () => {
		this.props.callAction(this.props.playerInfo);
	}

	handleRaise = () => {
		this.props.raiseAction(this.props.playerInfo);
	}

	handleFold = () => {
		this.props.foldAction(this.props.playerInfo);
	}

	render() {
		const wellStyles = { maxWidth: 125, margin: '0 auto 10px' };

		const buttonsInstance = (
			<div className="well" style={wellStyles}>
				{this.props.checkOrCall === 'check' ? (
					<Button bsStyle="primary" bsSize="large" block onClick={this.handleCheck}>
						Check
					</Button>
				) : (
					<Button bsStyle="success" bsSize="large" block onClick={this.handleCall}>
						Call
					</Button>
				)}
				<Button bsStyle="success" bsSize="large" block onClick={this.handleRaise}>
					Raise
				</Button>
				<Button bsStyle="danger" bsSize="large" block onClick={this.handleFold}>
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
	checkOrCall: PropTypes.string,
	checkAction: PropTypes.func.isRequired,
	callAction: PropTypes.func.isRequired,
	raiseAction: PropTypes.func.isRequired,
	foldAction: PropTypes.func.isRequired
};

PlayerControlsContainer.defaultProps = {
	checkOrCall: 'check'
};

export default PlayerControlsContainer;
