import React, { Component } from 'react'

export default class Final extends Component {
	render(){
		const { time, moves } = this.props
		return(
			<div className="final">
				<div className="row restart animated flipInY">
					<div className="col-xs-12 text-center score">
						<span className="value">SCORE </span>
						<span className="head">${Math.round(1000 / (time + (moves * 10)))} </span>
					</div>
					<div className="col-xs-12 text-center margin-top-5" id="restart">
						<i className="fa fa-repeat fa-4x"></i>
					</div>
					<div className="col-xs-offset-2 col-xs-8 margin-top-5 star">
						<div className="col-xs-4 text-right">
							<i className="fa fa-star fa-2x"></i>
						</div>
						<div className="col-xs-4 text-center">
							<i className={`fa ${ (moves > 14) ? "fa-star-o" : "fa-star"} fa-2x`}></i>
						</div>
						<div className="col-xs-4">
							<i className={`fa ${ (moves > 10) ? "fa-star-o" : "fa-star"} fa-2x`}></i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}