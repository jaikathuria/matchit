import React, { Component } from 'react'
import Card from './Card'
import { shuffle } from './../../../utils/_helper'
import _getData from './../../../utils/_getData';
import { BACK, FRONT } from '../../../utils/_constants'


export default class Grid extends Component {

	state = {
		cards: this.flipAll(shuffle(_getData()),FRONT)
	}

	openCards = []

	flipAll(cards,side){
		return cards.map(card => {
			card.side = side
			return card
		})
	}

	flip(index,side){
		this.setState(state => {
			state.cards[index].side = side
			return {
				cards: state.cards
			}
		})
	}

	handleCardClick(index){
		if(this.openCards.length < 2){
			this.flip(index,FRONT)
			this.openCards.push(index)
			this.openCards.length === 2 && setTimeout(this.checkMatch.bind(this),500)
		}
	}

	closePair(){
		this.flip(this.openCards[0],BACK)
		this.flip(this.openCards[1],BACK)
		this.props.updateMove()
	}

	checkMatch(){
		const [first, second] = this.openCards
		const { cards } = this.state
		if(cards[first].icon === cards[second].icon){
			this.props.updateMatched()
		} else {
			this.closePair()
		}
		this.openCards.splice(0,2)
	}

	componentDidMount(){
		setTimeout(()=>{
			this.props.startTimer()
			this.setState((state)=>{
				return {
					cards: this.flipAll(state.cards,BACK)
				}
			})	
		},1500)
	}

	render() {
		const { cards } = this.state
		return (
			<div className="row">
				{cards.map((card,index) => 
					<Card
						color={card.colorClass}
						icon={card.icon}
						key={card.id}
						side={card.side}
						index={index}
						handleClick={()=>{
							this.handleCardClick(index)
						}}
					/>)
				}
			</div> 
		)
	}
}