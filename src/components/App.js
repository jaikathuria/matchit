import React, { Component } from 'react'
import Navbar from './Navbar'
import Gameboard from './Gameboard'

class App extends Component {
	
	state = {
		moves: 0,
		time: 0
	}

	updateMoves() {
		this.setState({
			moves: (-(~this.state.moves)) // Bitwise method to increment by 1
		})
	}

	reset(){
		this.setState({
			moves: 0,
			time: 0
		})
	}

	startTimer() {
		this.timer = setInterval(()=>{
			this.setState({
				time: (-(~this.state.time)) // Bitwise method to increment by 1
			})
		},1000)
	}

	stopTimer(){
		clearInterval(this.timer)
	}


	render(){
		const { moves, time } = this.state
		return (
			<div className="wrapper">
				<div className="bg"></div>
				<Navbar
					moves={moves}
					time={time}
				/>
				<Gameboard
					moves={moves}
					time={time}
					updateMove={this.updateMoves.bind(this)}
					startTimer={this.startTimer.bind(this)}
					stopTimer={this.stopTimer.bind(this)}
					reset={this.reset.bind(this)}
				/>
			</div>
		)
	}
}
export default App
