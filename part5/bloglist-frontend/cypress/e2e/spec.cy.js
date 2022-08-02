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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'root',
        password: '123456'
      })
    })

    it('a new blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('.title').type('a blog created by cypress')
      cy.get('.author').type('an author created by cypress')
      cy.get('.url').type('an url created by cypress')
      cy.get('#create-blog').click()
      cy.contains('a blog created by cypress')
    })

    it("check likes", function () {
      cy.contains('a blog created by cypress');
      cy.contains('show').click();
      cy.get('.addLike').click();
      cy.get('#likes').contains("1");
      cy.get('.addLike').click();
      cy.get('#likes').contains('2');
    });

    it('check if blog can be delated', function () {
      cy.contains('a blog created by cypress');
      cy.contains('show').click();
      cy.contains('remove').click();
      cy.get('#root').should('not.contain', 'a blog created by cypress');
    });

    describe('adding more blogs', function() {
    
      beforeEach(function() {
        cy.addNewBlog({
          title: 'Title20',
          author: 'Author20',
          url: 'url20',
          likes: 20
        });
        cy.addNewBlog({
          title: 'Title21',
          author: 'Author21',
          url: 'url21',
          likes: 21
        })
        cy.addNewBlog({
          title: 'Title22',
          author: 'Author22',
          url: 'url22',
          likes: 22
        })
      })
  
      it('max likes', function(){
        cy.get('.single-blog').eq(0).should('contain', 'Title22')
        cy.get('.single-blog').eq(1).should('contain', 'Title21')

    })
    })
  })

})