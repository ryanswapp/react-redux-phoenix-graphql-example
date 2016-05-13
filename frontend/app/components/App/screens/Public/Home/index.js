import React from 'react'
import CSSModules from 'react-css-modules'
import style from './style'

const Home = React.createClass({
	getInitialState() {
		return {
			features: [
				'React, Redux',
				'React Router',
				'Redux Simple Router',
				'Node Sass, Bootstrap Sass'
			]
		}
	},
	render() {
		const { features } = this.state
		return (
			<div className="container">
				<h1 styleName="h1">React Starter Template</h1>
				<ul className="list-group">
						{ features.map((feature, i) => 
							<li key={ i } className="list-group-item">{ i + 1 }) { feature }</li>
							) }
				</ul>
			</div>
		)
	}
})

export default CSSModules(Home, style)