import React, { Component } from 'react'
import Curtain from './Curtain'
import Grid from './Grid'
import Final from './Final'
import { START, PLAYING, OVER } from '../../utils/_constants'

export default class Gameboard extends Component {
	
	state = {
		status: START
	}

	matched = 0

	updateMatched(){
		this.matched += 1
		if(this.matched === 8){
			this.props.stopTimer()
			this.setState({
				status: OVER
			})
		}
	}

	handleStatus(status){
		this.setState({
			status
		})
	}

	resetGame(){
		this.props.reset()
		this.matched = 0
		this.handleStatus(START)
	}

	render(){
		const { moves, time } = this.props 
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-10 col-xs-offset-1 card"> 
						{ 
							this.state.status === START && 
							<Curtain
								startGame={()=>{this.handleStatus(PLAYING)}}
							/>
						}{
							this.state.status === PLAYING && 
							<Grid
								updateMove={this.props.updateMove}
								updateMatched={this.updateMatched.bind(this)}
								startTimer={this.props.startTimer}
							/>
						}{
							this.state.status === OVER && 
							<Final
								moves={moves}
								time={time}
								restart={this.resetGame.bind(this)}
							/>
						}
					</div>
				</div>
			</div>
		)
	}
}