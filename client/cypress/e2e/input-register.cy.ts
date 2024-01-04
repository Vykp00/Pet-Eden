// Here lies test for registration render page
describe('Register New User', () => {
  it('Display Register Form', () => {
    // Set up data variables
    const emailName = 'maria.hellen@gmail.com'
    cy.visit('http://localhost:3000/api/v1/register')

    cy.get('[data-test="registrationForm"]').within(() => {
      cy.get('[data-test="newUserEmail"]').type(emailName) // Only yield inputs within form
      cy.get('[data-test="newUserEmail"]').contains(emailName)
    })
  })
})
