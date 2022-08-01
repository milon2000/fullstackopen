describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: '123456',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')

  })

})

describe('Login', function () {

  it('succeeds with correct credentials', function () {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('root')
    cy.get('#password').type('123456')
    cy.get('#login-button').click()
  })

  it('fails with wrong credentials', function () {

    //cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong username or password')
  })

})