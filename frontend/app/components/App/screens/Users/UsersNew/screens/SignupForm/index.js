import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
export const fields = ['first_name', 'last_name', 'email', 'password']

const validate = values => {
  const errors = {}
  if (!values.first_name) {
    errors.first_name = 'Required'
  } 
  if (!values.last_name) {
    errors.last_name = 'Required'
  } 
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.toString().length < 6) {
    errors.password = 'Password must be at least 6 characters'
  } 
  return errors
}

class SignupForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const {fields: {first_name, last_name, email, password}, handleSubmit} = this.props
    const renderInput = (field, label) =>
      <div className={ 'form-group' + (field.error && field.touched ? ' has-error' : '') }>
        <label htmlFor={ field.name }>{ label }</label>
        <input className="form-control" type={ field.name === 'password' ? 'password' : 'text' } placeholder={ label } {...field}/>
        { field.touched && field.error && <div>{ field.error }</div> }
      </div>

    return (<form onSubmit={ handleSubmit }>
        <div className="row">
          <div className="col-sm-6">
            { renderInput(first_name, 'First Name') }
          </div>
          <div className="col-sm-6">
            { renderInput(last_name, 'Last Name') }
          </div>
        </div>
        { renderInput(email, 'Email') }
        { renderInput(password, 'Password') }
        <div>
          <button className="btn btn-success btn-lg btn-block" onClick={ handleSubmit }>
             Submit
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signupForm',
  fields,
  validate
})(SignupForm)