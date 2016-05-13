import React from 'react'
import { Route, Link, IndexRoute } from 'react-router'

// Components
import App from 'components/App'
import Home from 'components/App/screens/Public/Home'
import UsersList from 'components/App/screens/Users/UsersList'
import UsersNew from 'components/App/screens/Users/UsersNew'
import UsersLogin from 'components/App/screens/Users/UsersLogin'

const routes = (
	<Route path="/" component={ App }>
		<IndexRoute component={ Home } />
		<Route path="users" component={ UsersList } />
		<Route path="signup" component={ UsersNew } />
		<Route path="login" component={ UsersLogin } />
	</Route>
)

export default routes