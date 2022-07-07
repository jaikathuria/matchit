import React, { Component } from 'react'


export default class Scorecard extends Component {
	render() {
		const { moves, time } = this.props
		return (
			<div className="col-xs-8">
				<div className="navbar-header pull-right">
					<div className="row">
						<p class="navbar-brand brand small">
							<span id="stars">
								<i className="fa fa-star"></i>
								<i className={`fa ${moves > 14 ? 'fa-star-o' : 'fa-star' }`}></i>
								<i className={`fa ${moves > 10 ? 'fa-star-o' : 'fa-star' }`}></i>
							</span>
						</p>
						<p className="navbar-brand brand small"> MOVES:<span className="head moves"> {moves}</span></p>
						<p className="navbar-brand brand small"> TIME:<span className="head time"> {time}</span></p>
					</div>
				</div>
			</div>
		)
	}
}