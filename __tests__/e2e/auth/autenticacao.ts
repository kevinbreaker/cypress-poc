import { Viewports } from '../../support/types'

import { makeServer } from '../../../server'

import userLogin from "@fixtures/auth"

/* 
  # Login no sistema da Solfácil
  * Como usuário do sistema
  * Eu quero validar meus dados e acessar a aplicação
  *
*/
const viewports: Viewports = [
  ['macbook-11', 'Desktop'],
  ['ipad-mini', 'Tablet'],
]

viewports.forEach(([viewport, device]) => {
  describe(`[Autenticação - ${viewport}] Como usuário, eu quero acessar a aplicação, dado que esteja na tela de login (/login)`, () => {
    let server: any

    context(`Realizar login na solfácil com perfil comercial`, () => {
      beforeEach(function () {
        server = makeServer()

        cy.viewport(viewport)
        cy.visit('/')

        // cy.intercept('http://localhost:3000/api/v1/auth').as('authRequest')
        // this.userLogin = await cy.fixture('auth')
        // cy.fixture('auth.ts').then(function (user: Auth) { this.userLogin = user })
      })

      afterEach(() => {
        server.shutdown()
      })

      it('Dado que eu seja um parceiro e seja cadastrado na plataforma, preencho email e password e clico em entrar, então sou redirecionado', function () {
        cy.findByTestId('input-email')
          .type(userLogin.comercial.email)

        cy.findByTestId('textfield-password').type(userLogin.comercial.password, { delay: 50 })
        cy.findByTestId('button-submit').click()

        cy.location('hash').should('eq', '#/')
      })

      it('Dado que eu seja um parceiro e seja cadastrado na plataforma, preencho email e password, seleciono "manter conectado" e clico em entrar, então sou redirecionado. Atualizo a página e ainda mantenho conectado', function () {
        cy.findByTestId('input-email')
          .type(userLogin.comercial.email)

        cy.findByTestId('textfield-password').type(userLogin.comercial.password, { delay: 50 })

        // TODO: Pode fazer pelo testid
        // cy.findByTestId('checkbox-connected-keep').click()
        // TODO: OU 
        cy.findByText('Mantenha-me conectado').click()

        cy.findByTestId('button-submit').click()

        cy.location('hash').should('eq', '#/')
        cy.reload()
        cy.wait(200)
        cy.location('hash').should('eq', '#/')
      })
    })

    context(`Realizar login na solfácil com perfil admin`, () => {
      beforeEach(function () {
        server = makeServer()

        cy.viewport(viewport)
        cy.visit('/')

        // cy.intercept('http://localhost:3000/api/v1/auth').as('authRequest')
        // this.userLogin = await cy.fixture('auth')
        // cy.fixture('auth.ts').then(function (user: Auth) { this.userLogin = user })
      })

      afterEach(() => {
        server.shutdown()
      })

      it('Dado que eu seja um parceiro e seja cadastrado na plataforma, preencho email e password e clico em entrar, então sou redirecionado', function () {
        cy.findByTestId('input-email')
          .type(userLogin.comercial.email)

        cy.findByTestId('textfield-password').type(userLogin.comercial.password, { delay: 50 })
        cy.findByTestId('button-submit').click()

        cy.location('hash').should('eq', '#/')
      })

      it('Dado que eu seja um parceiro e seja cadastrado na plataforma, preencho email e password, seleciono "manter conectado" e clico em entrar, então sou redirecionado. Atualizo a página e ainda mantenho conectado', function () {
        cy.findByTestId('input-email')
          .type(userLogin.comercial.email)

        cy.findByTestId('textfield-password').type(userLogin.comercial.password, { delay: 50 })

        // TODO: Pode fazer pelo testid
        cy.findByTestId('checkbox-connected-keep').click()
        // TODO: OU 
        // cy.findByText('Mantenha-me conectado').click()

        cy.findByTestId('button-submit').click()

        cy.location('hash').should('eq', '#/')
        cy.reload()
        cy.wait(200)
        cy.location('hash').should('eq', '#/')
      })
    })

    context(`Tentar realizar login com credenciais inválidas`, () => {
      beforeEach(function () {
        server = makeServer()

        cy.viewport(viewport)
        cy.visit('/')

        // cy.intercept('http://localhost:3000/api/v1/auth').as('authRequest')
        // this.userLogin = await cy.fixture('auth')
        // cy.fixture('auth.ts').then(function (user: Auth) { this.userLogin = user })
      })

      afterEach(() => {
        server.shutdown()
      })

      it('Dado que eu informe um e-mail não cadastrado na aplicação, apresenta um toast com a mensagem "Credenciais inválidas"', function () {
        cy.findByTestId('input-email')
          .type(userLogin.wrong.email)

        cy.findByTestId('textfield-password').type(userLogin.wrong.password, { delay: 50 })
        cy.findByTestId('button-submit').click()

        cy.findByText('Credenciais inválidas')
        cy.location('hash').should('eq', '#/login')
      })

      it('Dado que eu informe a senha incorreta, apresenta um toast com a mensagem "Credenciais inválidas"', function () {

        cy.findByTestId('input-email')
          .type(userLogin.comercial.email)

        cy.findByTestId('textfield-password').type(userLogin.wrong.password, { delay: 50 })

        cy.findByTestId('button-submit').click()

        cy.findByText('Credenciais inválidas')
        cy.location('hash').should('eq', '#/login')
      })
    })
  })
})
