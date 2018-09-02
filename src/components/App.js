import React, { Component } from 'react'
import Navbar from './Navbar'
import Gameboard from './Gameboard'

class App extends Component {
	
	state = {
		moves: 0,
		time: 0
	}

	updateMove() {
		this.setState({
			moves: (-(~this.state.moves)) // Bitwise method to increment by 1
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
					updateMove={this.updateMove.bind(this)}
					startTimer={this.startTimer.bind(this)}
					stopTimer={this.stopTimer.bind(this)}
				/>
			</div>
		)
	}
}
export default App
