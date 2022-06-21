import { Viewports } from '../../support/types'

import { makeServer } from '../../../server'

describe('[Auth] Authentication', () => {
  let server: any

  const viewports: Viewports = [
    ['macbook-11', 'Desktop'],
    ['macbook-15', 'Desktop'],
  ]

  viewports.forEach(([viewport, device]) => {
    context(`[${device}] - ${viewport}`, { scrollBehavior: 'nearest' }, () => {
      beforeEach(() => {
        server = makeServer()

        cy.viewport(viewport)
        cy.visit('/')

        cy.intercept('http://localhost:3000/api/v1/auth').as('authRequest')
        // cy.intercept('/auth').as('authRequest')
      })

      afterEach(() => {
        server.shutdown()
      })

      it('renders error message in email textfield and password textfield, when submit form with form signin empty', () => {
        cy.findByTestId('textfield-email')
        cy.findByTestId('textfield-password')
        cy.findByTestId('button-submit').click()

        // cy.findByTestId('textfield-email').findByText('Preencha este campo.')
        // cy.findByTestId('textfield-password').findByText('Preencha este campo.')
      })

      it('renders error message in password textfield, when submit form with password email empty', () => {
        cy.findByTestId('textfield-email')
        cy.findByTestId('textfield-password').type('123456', { delay: 50 })
        cy.findByTestId('button-submit').click()

        // cy.findByText('Preencha este campo.')
      })

      it('renders format error message in email textfield, when blur email textfield with a wrong format email value', () => {
        const wrongFormatEmail = 'teste-teste'

        cy.findByTestId('input-email')
          .type(wrongFormatEmail).blur()

        // cy.findByText(`Inclua um "@" no endereço de e-mail. "${wrongFormatEmail}" está com um "@" faltando.`)
      })

      it('render snackbar error  when submit a invalid credentials', () => {
        cy.findByTestId('input-email')
          .type('email@email.com')
        cy.findByTestId('textfield-password').type('12345600', { delay: 50 })
        cy.findByTestId('button-submit').click()

        // cy.wait('@authRequest').its('response.statusCode').should('eq', 401)
        cy.findByText('Credenciais inválidas')
      })

      it('should redirect to startups page when user submit with correct credentials', () => {
      
        cy.findByTestId('input-email')
          .type('admin@email.com')
        cy.findByTestId('textfield-password').type('123456', { delay: 50 })
        cy.findByTestId('button-submit').click()

        // cy.wait('@authRequest').its('response.statusCode').should('eq', 201)
        cy.location('hash').should('eq', '#/')
      })
    })
  })
})
