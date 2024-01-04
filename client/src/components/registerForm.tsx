import React, { Component } from 'react'

export default class RegisterForm extends Component {
  render() {
    return (
      <form data-test="registrationForm" className="registrationForm">
        <input data-test="newUserEmail" type="text"></input>
      </form>
    )
  }
}
