<script lang="ts" setup>
import { ref, computed } from "vue";

import googleG from "@/assets/images/google-g.png";
import Logo from "@/components/ui/Logo.vue";

import TextInput from "@/components/ui/TextInput.vue";
import Button from "@/components/ui/Button.vue";

import { useLoginMutation } from "@/modules/auth/composables/useAuthQuery";

const loginMutation = useLoginMutation();

const email = ref("");
const password = ref("");
const error = ref("");

const emailError = computed(() => {
  if (!email.value) return "";
  if (!email.value.includes("@")) return "Email inválido";
  return "";
});

const passwordError = computed(() => {
  if (!password.value) return "";
  if (password.value.length < 6) return "Mínimo 6 caracteres";
  return "";
});

const isFormValid = computed(
  () =>
    email.value && password.value && !emailError.value && !passwordError.value,
);

const isLoading = computed(() => loginMutation.isPending.value);

async function handleLogin() {
  if (!isFormValid.value) return;
  error.value = "";
  try {
    await loginMutation.mutateAsync({
      email: email.value,
      password: password.value,
    });
  } catch (err) {
    error.value = "email ou senha incorreto!";
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <router-link to="/">
          <Logo />
        </router-link>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="error" class="error-banner">{{ error }}</div>

        <TextInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="seu.email@exemplo.com"
          autocomplete="email"
          :error="emailError"
        />

        <TextInput
          v-model="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          autocomplete="current-password"
          :error="passwordError"
        />

        <router-link to="#" class="forgot-password"
          >Esqueceu a senha?</router-link
        >

        <Button
          type="submit"
          variant="primary"
          size="large"
          full-width
          :disabled="!isFormValid || isLoading"
          :loading="isLoading"
        >
          {{ isLoading ? "Entrando..." : "Entrar" }}
        </Button>

        <div class="divider">
          <span>ou</span>
        </div>

        <Button type="button" variant="outline" size="large" full-width>
          <div class="with-g"><img :src="googleG" /> Entrar com google</div>
        </Button>
      </form>

      <p class="login-footer">
        Não tem uma conta?
        <router-link to="/auth/register" class="register-link"
          >Cadastre-se gratuitamente</router-link
        >
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background: var(--color-surface);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 30px 20px;
    max-width: 100%;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  a {
    display: inline-block;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-receive);
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 1rem;
    color: var(--color-text-secundary);
    margin: 0;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.error-banner {
  padding: 12px 16px;
  background: rgba(184, 85, 105, 0.1);
  border: 1px solid var(--color-offer);
  border-radius: 8px;
  color: var(--color-offer);
  font-size: 0.9rem;
  text-align: center;
}

.forgot-password {
  text-decoration: none;
  color: var(--color-receive);
  font-size: 0.9rem;
  font-weight: 500;
  align-self: flex-end;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
  color: var(--color-text-secundary);
  font-size: 0.9rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--color-border);
  }
}

.with-g {
  display: flex;
  align-items: center;
  gap: 16px;
  img {
    width: 25px;
  }
}

.login-footer {
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-text-secundary);
  margin: 0;

  .register-link {
    color: var(--color-receive);
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
