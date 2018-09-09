import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import {RiverContainer, TurnContainer, FlopContainer} from './dealtCardsContainer';
import './TableCardsContainer.css';
import { flop, turn, river } from '../../../utils';

import {
	showFlopCards,
	showTurnCard,
	showRiverCard
} from '../../../actions/tableCardStatusActions';

export class TableCardsContainer extends Component {
	componentWillMount() {
		this.setState({
			...this.props.tableCardStatus
		});
	}

	render() {
		const wellStyles = { maxWidth: 400, minWidth: 200, margin: '0 auto 10px', float: 'left' };

		const buttonsInstance = (
			<div className="well" style={wellStyles}>
				<Button bsStyle="primary" bsSize="large" block onClick={this.props.showFlopCards}>
					{this.props.flopIsVisible ? 'Hide the flop' : 'Show the flop'}
				</Button>
				<Button bsStyle="primary" bsSize="large" block onClick={this.props.showTurnCard}>
					{this.props.turnIsVisible ? 'Hide the turn' : 'Show the turn'}
				</Button>
				<Button bsStyle="primary" bsSize="large" block onClick={this.props.showRiverCard}>
					{this.props.riverIsVisible ? 'Hide the river' : 'Show the river'}
				</Button>
			</div>
		);

		return (
			<div className='TableCardsContainer'>
				{buttonsInstance}
				{this.props.riverIsVisible ? <RiverContainer className='dealtCardsContainer' card={this.props.tableCards.river} /> : null}
				{this.props.turnIsVisible ? <TurnContainer className='dealtCardsContainer' card={this.props.tableCards.turn} /> : null}
				{this.props.flopIsVisible ? <FlopContainer className='dealtCardsContainer' cards={this.props.tableCards.flop} /> : null}
			</div>
		);
	}
}

TableCardsContainer.propTypes = {
	showFlopCards: PropTypes.func.isRequired,
	showTurnCard: PropTypes.func.isRequired,
	showRiverCard: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
	flopIsVisible: state.tableCardStatus.flopIsVisible,
	turnIsVisible: state.tableCardStatus.turnIsVisible,
	riverIsVisible: state.tableCardStatus.riverIsVisible
});

export default connect(mapStateToProps, {showFlopCards, showTurnCard, showRiverCard})(TableCardsContainer);
