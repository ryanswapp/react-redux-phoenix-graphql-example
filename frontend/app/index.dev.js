import 'style/index'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import routes from 'config/routes.js'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { syncHistory, routeReducer } from 'react-router-redux'
import Actions from 'redux/actions.js'
import Reducers from 'redux/reducers.js'
import DevTools from './containers/DevTools.js'
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers(Object.assign({}, Reducers, {
  form: formReducer,
  routing: routeReducer
}))

const reduxRouterMiddleware = syncHistory(browserHistory)

let finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware,
    reduxRouterMiddleware
  ),
  DevTools.instrument()
)(createStore)

const store = finalCreateStore(reducer)

reduxRouterMiddleware.listenForReplays(store)

render(
	<Provider store={ store }>
		<div>
	  	<Router history={ browserHistory }>
	  		{ routes }
	  	</Router>
	  	<DevTools />
  	</div>
	</Provider>,
	document.getElementById('app')
)

