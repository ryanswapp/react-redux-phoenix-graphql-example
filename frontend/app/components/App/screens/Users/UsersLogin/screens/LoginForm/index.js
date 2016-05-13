import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
export const fields = ['email', 'password']

const validate = values => {
  const errors = {}
  
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } 
  return errors
}

class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const {fields: {email, password}, handleSubmit} = this.props
    const renderInput = (field, label) =>
      <div className={ 'form-group' + (field.error && field.touched ? ' has-error' : '') }>
        <label htmlFor={ field.name }>{ label }</label>
        <input className="form-control" type={ field.name === 'password' ? 'password' : 'text' } placeholder={ label } {...field}/>
        { field.touched && field.error && <div>{ field.error }</div> }
      </div>

    return (<form onSubmit={ handleSubmit }>
        { renderInput(email, 'Email') }
        { renderInput(password, 'Password') }
        <div>
          <button className="btn btn-success btn-lg btn-block" onClick={ handleSubmit }>
             Login
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'loginForm',
  fields,
  validate
})(LoginForm)