import React from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import style from './style'
import Actions from 'redux/actions'

const Notifications = React.createClass({
  render () {
    const { notifications } = this.props
    let items = notifications.map((notification, i) => {
      return <div key={ i } styleName="alert" className={ 'alert alert-' + notification.type }>{ notification.text }</div>
    })
    return (
      <div styleName="notification-container">
        { items }
      </div>
    )
  }
})

function mapStateToProps(state) {
  return { 
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(CSSModules(Notifications, style))