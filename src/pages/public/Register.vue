<script lang="ts" setup>
import { ref, computed } from "vue";

import googleG from "@/assets/images/google-g.png";
import Logo from "@/components/ui/Logo.vue";

import TextInput from "@/components/ui/TextInput.vue";
import Button from "@/components/ui/Button.vue";

import { useRegisterMutation } from "@/modules/auth/composables/useAuthQuery";

const registerMutation = useRegisterMutation();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");

const nameError = computed(() => {
  if (!name.value) return "";
  if (name.value.length < 2) return "Nome deve ter pelo menos 2 caracteres";
  return "";
});

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

const confirmPasswordError = computed(() => {
  if (!confirmPassword.value) return "";
  if (confirmPassword.value !== password.value) return "Senhas não coincidem";
  return "";
});

const isFormValid = computed(
  () =>
    name.value &&
    email.value &&
    password.value &&
    confirmPassword.value &&
    !nameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value,
);

const isLoading = computed(() => registerMutation.isPending.value);

async function handleRegister() {
  if (!isFormValid.value) return;
  error.value = "";
  try {
    await registerMutation.mutateAsync({
      name: name.value,
      email: email.value,
      password: password.value,
    });
  } catch (err) {
    error.value = "Erro ao cadastrar. Tente novamente.";
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <router-link to="/">
          <Logo />
        </router-link>
        <p>Insira seus dados para se cadastrar</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div v-if="error" class="error-banner">{{ error }}</div>

        <TextInput
          v-model="name"
          label="Nome"
          type="text"
          placeholder="Seu nome completo"
          autocomplete="name"
          :error="nameError"
        />

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
          autocomplete="new-password"
          :error="passwordError"
        />

        <TextInput
          v-model="confirmPassword"
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha"
          autocomplete="new-password"
          :error="confirmPasswordError"
        />

        <Button
          type="submit"
          variant="primary"
          size="large"
          full-width
          :disabled="!isFormValid || isLoading"
          :loading="isLoading"
        >
          {{ isLoading ? "Cadastrando..." : "Cadastrar" }}
        </Button>

        <div class="divider">
          <span>ou</span>
        </div>

        <Button type="button" variant="outline" size="large" full-width>
          <div class="with-g"><img :src="googleG" /> Entrar com google</div>
        </Button>
      </form>

      <p class="register-footer">
        Já tem uma conta?
        <router-link to="/auth/login" class="login-link"
          >Faça login</router-link
        >
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.register-card {
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

.register-header {
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

.register-form {
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

.register-footer {
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-text-secundary);
  margin: 0;

  .login-link {
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
