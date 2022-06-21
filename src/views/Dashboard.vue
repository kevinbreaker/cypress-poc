<script lang="ts" setup>
import { useToast } from '@solfacil/girassol'
import { onMounted, ref } from 'vue'
import { getUsers, postUser, type User } from '../services/users'

const toast = useToast()
const users = ref<User[]>([])

const hasSatoshi = ref(false)
const modal = ref()

async function addSatoshi() {
  await postUser({
    name: 'Satoshi Nakamoto',
    cpf: '000.000.000-00',
    email: 'satoshi@bitcoin.com',
    phone: '(00) 0000-0000',
    address: 'Unknown',
  })

  hasSatoshi.value = true
  fetchUsers()

  toast.createToast(`Usuário "Satoshi Nakamoto" adicionado!`, {
    showOneToast: true,
  })
}

async function fetchUsers() {
  const { data } = await getUsers()
  users.value = data
}

async function addNewUser({ target }: any) {
  const { name, cpf, email, address, phone } = target

  await postUser({
    name: name.value,
    address: address.value,
    cpf: cpf.value,
    email: email.value,
    phone: phone.value,
  })
  closeModal()
  fetchUsers()

  toast.createToast(`Usuário "${name.value}" adicionado!`, {
    showOneToast: true,
  })
}

function openModal() {
  modal.value.showModal()
}
function closeModal() {
  modal.value.close()
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <nav class="navbar">
    <ul class="links">
      <li class="link">
        <router-link to="/">Home</router-link>
      </li>
      <li class="link">
        <router-link to="/profile">Profile</router-link>
      </li>
    </ul>
  </nav>

  <section class="dashboard-page">
    <h1>LOGGED!!!</h1>

    <section class="bg-brand-primary-light py-2xs px-xs">
      <div class="flex py-micro mr-micro">
        <SolButton
          :disabled="hasSatoshi"
          class="mr-2xl"
          id="add-satoshi"
          variant="primary"
          @click="addSatoshi"
        >
          Adicionar Satoshi Nakamoto
        </SolButton>

        <SolButton id="open-modal" variant="secondary" @click="openModal"
          >Inserir usuário</SolButton
        >
      </div>
    </section>

    <table class="table" data-testid="table-users">
      <thead data-testid="table-users-head">
        <th>name</th>
        <th>cpf</th>
        <th>email</th>
        <th>phone</th>
        <th>address</th>
      </thead>

      <tbody class="tbody" data-testid="table-users-body">
        <tr
          v-for="user in users"
          :key="user.id"
          :data-testid="`table-users-body-row-${user.id}`"
        >
          <td :data-testid="`table-users-body-row-${user.id}-name`">
            {{ user.name }}
          </td>
          <td :data-testid="`table-users-body-row-${user.id}-cpf`">
            {{ user.cpf }}
          </td>
          <td :data-testid="`table-users-body-row-${user.id}-email`">
            {{ user.email }}
          </td>
          <td :data-testid="`table-users-body-row-${user.id}-phone`">
            {{ user.phone }}
          </td>
          <td :data-testid="`table-users-body-row-${user.id}-address`">
            {{ user.address }}
          </td>
        </tr>
      </tbody>
    </table>

    <dialog data-testid="modal-add-user" class="" ref="modal">
      <h1 class="font-highlight text-md mb-micro">Adicionar usuário</h1>

      <form data-testid="form-add-user" @submit.prevent="addNewUser">
        <SolTextfield
          id="user-name"
          name="name"
          required
          label="nome"
          placeholder="Insira o nome"
        />
        <SolTextfield
          id="user-cpf"
          name="cpf"
          required
          label="cpf"
          placeholder="Insira o cpf"
        />
        <SolTextfield
          id="user-email"
          name="email"
          required
          label="email"
          placeholder="Insira o email"
        />
        <SolTextfield
          id="user-address"
          name="address"
          required
          label="endereço"
          placeholder="Insira o endereço"
        />
        <SolTextfield
          id="user-phone"
          name="phone"
          required
          label="Telefone"
          placeholder="Insira o Telefone"
        />

        <div class="flex mt-2xs">
          <SolButton
            type="reset"
            id="cancel-add-user"
            variant="flat"
            @click="closeModal"
          >
            Cancelar
          </SolButton>

          <SolButton id="submit-add-user" type="submit" variant="primary">
            Adicionar usuário
          </SolButton>
        </div>
      </form>
    </dialog>
  </section>
</template>

<style lang="scss">
.navbar {
  @apply flex items-center justify-end;
  @apply sticky top-0;
  @apply w-full h-14 px-sm;
  @apply bg-brand-primary-medium;
  @apply font-highlight font-bold;

  > .links {
    @apply flex;
  }

  > .links > .link {
    &:not(:last-of-type) {
      @apply inline-block;
      @apply mr-xs;
    }

    > .router-link-exact-active {
      @apply text-brand-primary-light;
      @apply border-b-3 border-brand-primary-light;
    }
  }
}

.dashboard-page {
  @apply flex flex-col;

  > .table {
    @apply border-collapse border-1;
    @apply bg-neutral-high-light;
  }

  > .table {
    > .tbody > tr > td {
      @apply py-3xs;
      @apply border-brand-primary-pure border-1;
    }
  }
}
</style>
