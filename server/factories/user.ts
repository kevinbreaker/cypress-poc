import { Factory } from 'miragejs'
import { faker } from '@faker-js/faker'

faker.setLocale('pt_BR')

export default {
  user: Factory.extend({
    name() {
      return faker.fake('{{name.firstName}} {{name.lastName}}')
    },

    email() {
      return faker.fake('{{internet.email}}')
    },

    cpf() {
      return `${faker.datatype.number({
        min: 11111111111,
        max: 99999999999,
      })}`.replace(/(^\d{3})(\d{3})(\d{3})(\d{2}$)/, '$1.$2.$3-$4')
    },

    phone() {
      return faker.phone.phoneNumber()
    },

    address() {
      return ` ${faker.address.cityName()} - ${faker.address.streetAddress()}`
    }
  }),
}
