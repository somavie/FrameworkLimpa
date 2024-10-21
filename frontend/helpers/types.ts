import { number } from "yup";
// FORMS

// helpers/types.ts

export interface LoginFormType {
  nomeUsuario: string;
  senha: string;
}

// helpers/types.ts

export interface MunicipioType {
  id: number;
  nome: string;
  provincia_id: number;
}

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

// helpers/tipousuarioTypes.ts

export interface TipoUsuarioType {
  id: number;
  nome: string;
  descricao?: string;
}
// helpers/turmaTypes.ts

export interface EnderecoType {
  id: number;
  municipio_id: number;
  numero_casa: string;
  bairro: string;
}
export interface Observacao {
  situacao_id: number;
  descricao: string;
  nome?: string; // Pode ser string ou null
}

export interface Tecnico {
  id: number;
  nome: string; // Pode ser string ou null
}
export interface Equipamento {
  equipamento_id: number;
  quantidade: number;
  status: string;
  localizacao: string; // Pode ser string ou null
  nome?: string;
}

export interface Relatorio {
  observacao_final: string;
  tecnico_cessante_id: number;
  tecnico_entrante_id: number;
}
// helpers/types.ts

export interface RelatorioDado {
  id: number;
  tecnico_cessante_id: number | null;
  tecnico_entrante_id: number | null;
  cessante: string;
  entrante: string;
  data_criacao: Date;
  observacoes_finais: string | null;
  estado: boolean;
  data_criacao_registro: Date;
  data_alteracao: Date;
  observacoes?: Observacao[];
  equipamentos?: Equipamento[];
}
