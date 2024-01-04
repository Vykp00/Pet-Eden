// Code block specifie this file is use jsdom as test present
import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import RegisterForm from '../src/components/registerForm'

describe('Register Form Test', () => {
  it('It call onSave handler for email input', async () => {
    // Set up user event
    const user: UserEvent = userEvent.setup()

    // Mock saveHandler
    const saveHandler = jest.fn()
    render(<RegisterForm onsave={saveHandler} />)

    // Type email to input form
    const input: HTMLElement = screen.getByTestId('newUserEmail')
    const emailName = 'maria.hellen@gmail.com'
    await user.type(input, emailName)

    // saveHandler should be called in form
    expect(saveHandler).toHaveBeenCalledWith(emailName)
    // Expect input to have new email value
    expect(input).toHaveValue(emailName)
  })
})
