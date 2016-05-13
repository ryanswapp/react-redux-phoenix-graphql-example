import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Actions from 'redux/actions.js'
import LoginForm from './screens/LoginForm'

const UserLogin = React.createClass({
  handleSubmit(data) {
    console.log(data)
  },
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <h1 className="page-header text-center">Login</h1>
            <div className="light-well">
              <div className="panel-body">
                <div className="row">
                  <div className="col-sm-8 col-sm-offset-2">
                    <h3 className="panel-title"></h3>
                    <LoginForm onSubmit={ this.handleSubmit } />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})



export default UserLogin