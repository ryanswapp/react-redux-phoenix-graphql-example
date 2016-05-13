const Reducers = {}

// Example: this is a simple example of a reducer function for users

Reducers.users = function users(state=[], action) {
	switch (action.type) {
    case 'FETCH_USERS':
      var newState = action.users
      return newState
    case 'FAILED_FETCH_USERS':
      return state
    default:
      return state
  }
}

Reducers.notifications = function notifications(state=[], action) {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      var newState = [].concat(state, action.notification)
      return newState

    case 'REMOVE_NOTIFICATION':
      var newState = state.filter(function(notification) {
        return action.notification.id !== notification.id
      })
      return newState

    case 'HIDE_ALL_NOTIFICATIONS':
      var newState = []
      return newState

    default:
      return state
  }
}

export default Reducers