import React, { Component } from 'react'

export default class Curtain extends Component {
	render() {
		return (
			<div className="curtain animated" onClick={this.props.startGame}>
				<div className="content">
					<div className="start">
						<i className="fa fa-play fa-4x"></i>
					</div>
					<span className="margin-top-30">
					CLICK TO PLAY
					</span> 
				</div>
			</div>
		)
	}
}