import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import MainMenu from 'components/App/menus/MainMenu'
import Notifications from 'components/App/util/Notifications'

const App = ({children}) => (
	<div>
	  <MainMenu />
    <Notifications />
		{ children }
	</div>
)

export default App