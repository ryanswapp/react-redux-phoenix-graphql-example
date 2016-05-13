import React from 'react'
import Actions from 'redux/actions.js'
import { connect } from 'react-redux'

const UsersList = React.createClass({
  componentDidMount () {

    const { dispatch } = this.props

    dispatch(Actions.users.fetchUsers())
  },
  render () {
    const { users } = this.props
    return (
      <div className="container">
        <h1>Users List</h1>
        <div className="users-list">
          <ul className="list-group">
            { users.map((user, i) => {
               return <li key={ i } className="list-group-item">{ user.name }</li> 
            }) }
          </ul>
        </div>
      </div>
    )
  }
})

function mapStateToProps(state) {
	return { 
    users: state.users,
  }
}

export default connect(mapStateToProps)(UsersList)