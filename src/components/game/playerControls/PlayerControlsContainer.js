import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './PlayerControlsContainer.css';

class PlayerControlsContainer extends Component {
	render() {
		const wellStyles = { maxWidth: 125, margin: '0 auto 10px' };

		const buttonsInstance = (
			<div className="well" style={wellStyles}>
				<Button bsStyle="primary" bsSize="large" block>
					Check
				</Button>
				<Button bsStyle="success" bsSize="large" block>
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

export default PlayerControlsContainer;
