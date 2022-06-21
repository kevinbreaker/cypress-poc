<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { signin } from '../services/auth'

import { USER } from '../store'

import { useToast } from '@solfacil/girassol'

const router = useRouter()
const user = USER()

async function login({ target }: any) {
  try {
    const { username, password } = target

    const { data } = await signin({
      username: username.value,
      password: password.value,
    })

    user.value = { ...data, token: data.token }

    router.push({ name: 'Dashboard' })
  } catch (er) {
    const error = er.response.data.errors

    useToast().createToast(error.messages, {
      type: 'danger',
      showOneToast: true,
    })
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="card-login">
      <h1 class="title">Login</h1>

      <form class="login" @submit.prevent="login">
        <SolTextfield
          id="email"
          label="E-mail"
          name="username"
          required
          placeholder="email@email.com"
        />
        <SolTextfieldPassword id="password" label="Senha" name="password" />

        <SolCheckbox
          id="keep"
          class="mb-3xs"
          :value="1"
          name="connected"
          label="Mantenha-me conectado"
        />

        <SolButton id="submit" type="submit" variant="primary" class="button">
          Entrar
        </SolButton>
      </form>
    </div>
  </section>
</template>

<style lang="scss">
.auth-page {
  @apply flex flex-col justify-center items-center;
  @apply h-screen w-screen;
  @apply bg-neutral-low-medium;

  > .card-login {
    @apply bg-neutral-high-light;
    @apply px-sm pb-sm;
    @apply rounded-sm;

    width: clamp(300px, 100%, 500px);
  }

  > .card-login {
    > .title {
      @apply font-highlight text-lg;
    }

    > .login {
      @apply flex flex-col w-full;
    }

    > .login > .button {
      @apply self-end w-full;
    }

    [class^='sol-textfield'] {
      @apply mb-xs;
    }
  }
}
</style>
