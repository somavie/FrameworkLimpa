import { number, mixed, boolean, object, ref, date, string } from "yup";
import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  nomeUsuario: yup.string().required("Nome de usuário é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
});

export const UsuarioSchema = yup.object().shape({
  pessoa_id: yup
    .number()
    .integer("O campo pessoa_id deve ser um número inteiro")
    .required("O campo pessoa_id é obrigatório"),

  nomeUsuario: yup
    .string()
    .max(50, "O nome de usuário pode ter no máximo 50 caracteres")
    .required("O campo nomeUsuario é obrigatório"),

  senha: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .optional(),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não coincidem")
    .optional(),

  tipo_usuario_id: yup
    .number()
    .integer("O campo tipo_usuario_id deve ser um número inteiro")
    .required("O campo tipo_usuario_id é obrigatório"),

  delete_permissao: yup.boolean().optional(), // Campo opcional

  update_permissao: yup.boolean().optional(), // Campo opcional

  view_permissao: yup.boolean().optional(), // Campo opcional

  create_permissao: yup.boolean().optional(), // Campo opcional

  estado: yup.boolean().optional(), // Campo opcional
});

export const RegisterSchema = yup.object().shape({
  pessoa_id: yup.number().required("O ID da pessoa é obrigatório"),
  nomeUsuario: yup
    .string()
    .required("O nome de usuário é obrigatório")
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
  senha: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não coincidem")
    .required("A confirmação da senha é obrigatória"),
  tipo_usuario_id: yup.number().required("O tipo de usuário é obrigatório"),
});

export const PermissaoSchema = object().shape({
  usuario_id: number().required("O ID do usuário é obrigatório"),
  delete_permissao: boolean().nullable(), // Permite que seja nulo
  update_permissao: boolean().nullable(), // Permite que seja nulo
  view_permissao: boolean().nullable(), // Permite que seja nulo
  create_permissao: boolean().nullable(), // Permite que seja nulo
});

export const PessoaSchema = object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  data_nascimento: yup.string().required("Data de nascimento é obrigatória"),
  genero: yup
    .string()
    .oneOf(["Masculino", "Feminino", "Outro"])
    .required("Gênero é obrigatório"),
  endereco_id: yup.number().optional(),
  municipio_id: yup.number().optional(),
});

export const TipoUsuarioSchema = object().shape({
  nome: string()
    .required("O nome é obrigatório")
    .max(50, "O nome pode ter no máximo 50 caracteres"),
  descricao: string().optional(), // Descrição é opcional
});

// Schema para criação de usuário (com senha)
export const UsuarioCreateSchema = object().shape({
  pessoa_id: number()
    .integer("O campo pessoa_id deve ser um número inteiro")
    .required("O campo pessoa_id é obrigatório"),

  nomeUsuario: string()
    .max(50, "O nome de usuário pode ter no máximo 50 caracteres")
    .required("O campo nomeUsuario é obrigatório"),

  senha: string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("O campo senha é obrigatório"),

  confirmPassword: string()
    .oneOf([yup.ref("senha")], "As senhas não coincidem")
    .required("A confirmação da senha é obrigatória"),

  tipo_usuario_id: number()
    .integer("O campo tipo_usuario_id deve ser um número inteiro")
    .required("O campo tipo_usuario_id é obrigatório"),

  delete_permissao: boolean().notRequired(), // Campo opcional
  update_permissao: boolean().notRequired(), // Campo opcional
  view_permissao: boolean().notRequired(), // Campo opcional
  create_permissao: boolean().notRequired(), // Campo opcional
  estado: boolean().notRequired(), // Campo opcional
});

// Schema para edição de usuário (sem senha)
export const UsuarioEditSchema = object().shape({
  pessoa_id: number()
    .integer("O campo pessoa_id deve ser um número inteiro")
    .required("O campo pessoa_id é obrigatório"),

  nomeUsuario: string()
    .max(50, "O nome de usuário pode ter no máximo 50 caracteres")
    .required("O campo nomeUsuario é obrigatório"),

  tipo_usuario_id: number()
    .integer("O campo tipo_usuario_id deve ser um número inteiro")
    .required("O campo tipo_usuario_id é obrigatório"),

  delete_permissao: boolean().notRequired(), // Campo opcional
  update_permissao: boolean().notRequired(), // Campo opcional
  view_permissao: boolean().notRequired(), // Campo opcional
  create_permissao: boolean().notRequired(), // Campo opcional
  estado: boolean().notRequired(), // Campo opcional
});

// Outros schemas permanecem inalterados
