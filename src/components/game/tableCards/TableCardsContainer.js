import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {RiverContainer, TurnContainer, FlopContainer} from './dealtCardsContainer';
import './TableCardsContainer.css';

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

	showTheFlop = () => {
		this.props.showFlopCards();
		this.props.resetPlayers();
	}

	showTheTurn = () => {
		this.props.showTurnCard();
		this.props.resetPlayers();
	}

	showTheRiver = () => {
		this.props.showRiverCard();
		this.props.resetPlayers();
	}

	render() {
		const flopCards = this.props.flopIsVisible ? this.props.tableCards.flop : null;
		const turnCard = this.props.turnIsVisible ? this.props.tableCards.turn : null;
		const riverCard = this.props.riverIsVisible ? this.props.tableCards.river : null;

		return (
			<div className='TableCardsContainer'>
				<RiverContainer className='dealtCardsContainer' card={riverCard} />
				<TurnContainer className='dealtCardsContainer' card={turnCard} />
				<FlopContainer className='dealtCardsContainer' cards={flopCards} />
			</div>
		);
	}
}

TableCardsContainer.propTypes = {
	showFlopCards: PropTypes.func.isRequired,
	showTurnCard: PropTypes.func.isRequired,
	showRiverCard: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
	flopIsVisible: state.tableCardStatus.flopIsVisible,
	turnIsVisible: state.tableCardStatus.turnIsVisible,
	riverIsVisible: state.tableCardStatus.riverIsVisible
});

export default connect(mapStateToProps, {showFlopCards, showTurnCard, showRiverCard})(TableCardsContainer);
