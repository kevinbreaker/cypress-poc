## Testes
Os testes com cypress se encontram na pasta [**\_\_tests\_\_**](/__tests__/). As specs estão dentro do [**\_\_tests\_\_/e2e**](/__tests__/e2e). Dados que vão ser utilizados para preencher campos de formulários estão dentro de [**\_\_tests\_\_/fixtures**](/__tests__/fixtures/)

O padrão utilizado nos `data-testid` são os seguinte:
- [componente]-[o-que-é] ex: `textfield-password`, `button-submit`, `switch-notification`
- [componente]-[contexto/grupo]-[o-que-é|valor] ex: `textfield-form-register-email`,  `textfield-users-search`, `list-user-ramon`, `radio-colors-red`, `radio-colors-blue`



Componentes que compõem outros componentes (Textfield, Select, Accordion, etc) Possuem outros `data-testid` internos para facilitar na busca especificas pelos mesmos.

Ex:
  - `textfield-password` possui um `input-passowrd` internamente
  - `dropdown-select-fruits` possui `dropdown-list-select-fruits`, `search-dropdown-select-fruit`, `option-select-fruits-apple`


### Tecnologias utilizadas
- [Cypress 10](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)
- [Testing-library](https://testing-library.com/docs/cypress-testing-library/intro)
- [MirageJS - API Mock](https://miragejs.com/docs/getting-started/introduction/)

- [Girassol - Design system](http://girassol.solfacil.tech/?path=/story/introdu%C3%A7%C3%A3o-introdu%C3%A7%C3%A3o--page)


## Iniciando
- Ter o `nodejs` na versão `16` acima
- Ter o `yarn` instalado (caso não o tenha `npm i -g yarn`)
- Instalar os pacotes com `yarn` no terminal.
- Rodar o cypress `yarn test:e2e` no terminal.