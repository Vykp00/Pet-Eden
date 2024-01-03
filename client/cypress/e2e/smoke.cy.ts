describe('Smoke test', () => {
  it('The welcome message come up', () => {
    cy.visit('http://localhost:3000').contains('Hello World!')
  })
})
