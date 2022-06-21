import { Viewports } from '../support/types'

import { makeServer } from '../../server'

import userLogin from "@fixtures/auth"
import userFixture from "@fixtures/user"

/* 
  # Dashboard
  * Como administrador do sistema
  * Eu quero ver a tabela de usuários
  * Eu quero adicionar o usuário "Satoshi"
  * Eu quero adicionar um usuário de meu interesse
  *
*/
const viewports: Viewports = [
  ['macbook-11', 'Desktop'],
  ['ipad-mini', 'Tablet'],
]

viewports.forEach(([viewport, device]) => {
  describe(`[Autenticação - ${viewport}] Como usuário, eu quero acessar a aplicação, dado que esteja na tela de login (/login)`, () => {

    before(() => {
      makeServer()
      cy.viewport(viewport)
      cy.login({ email: userLogin.admin.email, password: userLogin.admin.password })
    })


    context(`Atualizar tabela de usuário como usuário admin`, () => {
      it('Dado como usuário admin, quero ver os 4 usuários cadastrados no sistema', function () {
        cy.findByTestId('table-users-body').children().should('have.length', 4)
      })

      it('Dado como usuário admin, quero adicionar o usuário Satoshi, clicando no botão "Adicionar Satoshi Nakamoto" e visualizar na tabela de usuários', function () {
        cy.findByText('Adicionar Satoshi Nakamoto').click()

        cy.findByText('satoshi@bitcoin.com')
        cy.findByTestId('table-users-body').children().should('have.length', 5)

        cy.findByText('Usuário "Satoshi Nakamoto" adicionado!')
      })

      it('Dado como usuário admin, quero adicionar um usuário; Abrindo o modal clicando no botão "Inserir usuário", preenchendo o formulário com os dados do usuário e submetendo-o. Ver a tabela de usuários atualizada ', function () {
        const user = userFixture.addUser

        cy.findByTestId('button-open-modal').click()

        for (let userProp in user) {
          const userData = user[userProp as keyof typeof user] 

          cy.findByTestId(`textfield-user-${userProp}`).type(userData)
        }

        cy.findByTestId('button-submit-add-user').click()

        cy.findByText(`Usuário "${user.name}" adicionado!`)

        cy.findByText(user.email)
        cy.findByTestId('table-users-body').children().should('have.length', 6)
      })
    })
  })
})
