import { number } from "yup";
// FORMS

// helpers/types.ts

export interface LoginFormType {
  nomeUsuario: string;
  senha: string;
}

// helpers/types.ts

export interface RegisterFormType {
  id: number;
  pessoa_id: number;
  nomeUsuario: string;
  senha: string;
  confirmPassword: string;
  tipo_usuario_id: number;
}

// helpers/usuarioTypes.ts

export interface Usuario {
  delete_permissao: any;
  update_permissao: any;
  view_permissao: any;
  create_permissao: any;
  estado: any;
  id: number;
  pessoa_id: number;
  nomeUsuario: string;
  senha: string;
  tipo_usuario_id: number;
}
export interface UsuarioType {
  id: number;
  pessoa_id: number;
  nomeUsuario: string;
  confirmPassword: string;
  senha: string;
  tipo_usuario_id: number;
  estado?: boolean;
  delete_permissao?: boolean;
  update_permissao?: boolean;
  view_permissao?: boolean;
  create_permissao?: boolean;
  data_criacao?: Date; // Opcional, para registrar quando o usuário foi criado
  data_remocao?: Date; // Opcional, para registrar quando o usuário foi removido
  data_alteracao?: Date; // Opcional, para registrar quando o usuário foi alterado
}

export interface Endereco {
  id: number;
  municipio_id: number;
  bairro: string;
  numero_casa: string;
  endereco_completo: string;
}




export interface PermissaoType {
  id: number;
  usuario_id: number;
  delete_permissao?: boolean; // Pode ser opcional se não for obrigatório
  update_permissao?: boolean; // Pode ser opcional se não for obrigatório
  view_permissao?: boolean; // Pode ser opcional se não for obrigatório
  create_permissao?: boolean; // Pode ser opcional se não for obrigatório
}

// helpers/pessoaTypes.ts

export interface PessoaType {
  id: number;
  nome: string;
  data_nascimento: string; // Data é representada como string no formato 'YYYY-MM-DD'
  genero: "Masculino" | "Feminino" | "Outro";
  imagem?: string;
  endereco_id: number;
  endereco_completo?: string;
  municipio_id: number;
}


export interface ProvinciaType {
  id: number;
  nome: string;
}

export interface MunicipioType {
  id: number;
  nome: string;
  provincia_id: number;
}

// helpers/contatoTypes.ts
export interface ContatoType {
  id: number;
  cont_pessoa_id: number; // ID da pessoa associada ao contato
  valor: string; // Valor do contato (e.g. email, telefone)
  tipo: "email" | "telefone"; // Tipo de contato
}