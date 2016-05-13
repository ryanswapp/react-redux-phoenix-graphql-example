import randomstring from 'randomstring'

let notificationActions = {}
// Notifications

notificationActions.addNotification = function addNotification(type, text) {
  return dispatch => {
    var rs = randomstring.generate(8)
    dispatch({
      type: 'ADD_NOTIFICATION',
      notification: {
        type: type,
        text: text,
        id: rs
      }
    })
    setTimeout(function() {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        notification: {
          id: rs
        }
      })
    }, 5000)
  }
}

notificationActions.removeNotification = function removeNotification(id) {
  return {
    type: 'REMOVE_NOTIFICATION',
    notification: {
      id: id
    }
  }
}

export default notificationActions