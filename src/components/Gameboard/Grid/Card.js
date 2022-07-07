import React, { Component } from 'react'
import { BACK } from '../../../utils/_constants'

export default class Card extends Component {
	render(){
		const { color, icon, side } = this.props
		return (
			<div className={side === BACK ? 'tile col-xs-3' : 'tile col-xs-3 flipped'} onClick={this.props.handleClick}>
				<div className="content">
					<div className='front'></div>
					<div className={`back ${color}`}> 
						<i className={`fa ${icon} fa-2x`}></i>
					</div>
				</div>
			</div>
		)
	}
}