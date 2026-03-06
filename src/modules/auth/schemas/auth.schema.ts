import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),

  password: yup
    .string()
    .min(6, "Mínimo de 6 caracteres")
    .required("Senha é obrigatória"),
});

export const registerSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),

  email: yup.string().email("Email inválido").required("Email é obrigatório"),

  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
});
