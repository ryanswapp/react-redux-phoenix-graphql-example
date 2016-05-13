import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Actions from 'redux/actions.js'
import SignupForm from './screens/SignupForm'


const UsersNew = React.createClass({
  handleSubmit(data) {

    // this.props.dispatch(Actions.users.registerUser(data))
    console.log(data)
    
  },
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <h1 className="page-header text-center">Join Us</h1>
            <div className="light-well">
              <div className="panel-body">
                <div className="row">
                  <div className="col-sm-8 col-sm-offset-2">
                    <h3 className="panel-title">Create Your Account</h3>
                    <SignupForm onSubmit={ this.handleSubmit } />
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

export default connect()(UsersNew)