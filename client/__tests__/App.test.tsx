/**
 * @jest-environment jsdom
 */
// Code block specifie this file is use jsdom as test present
import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App test', () => {
  it('renders Hello World Message', () => {
    render(<App />)
    expect(screen.getByText('Hello World!')).toBeInTheDocument()
  })
})
