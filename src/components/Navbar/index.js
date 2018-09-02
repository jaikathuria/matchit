import React, { Component } from 'react'
import Scorecard from './Scorecard'
export default class Navbar extends Component {
	render() {
		const { moves, time } = this.props
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container" id="top">
					<div className="row">
						<div className="col-xs-4">
							<div className="navbar-header">
								<a className="navbar-brand brand" href="/"> MATCH<span className="head">IT</span></a>
							</div>
						</div>
						<Scorecard 
							moves={moves}
							time={time}
						/>
					</div>
				</div>
			</nav>
		)
	}
}