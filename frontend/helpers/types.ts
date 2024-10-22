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

export type MatriculaType = {
  id: number;
  nome: string;
  email: string;
  dataDeNascimento: string;
  curso: string;
  numeroDeEstudante: string;
  turma: string;
  pessoa: string;
};
export type MatriculaForm = {
  id: number;
  turma_id: number;
  data_matricula: Date;
  pessoa_id: number;
  pessoa: string;
  genero: string;
  turma: string;
  classe: string;
  curso: string;
  endereco_completo: string;
};

export type CargoType = {
  id: number;
  nome: string;
  descricao: string;
};

// helpers/pagamentoTypes.ts

// helpers/pagamentoTypes.ts

export interface PagamentoType {
  id: number;
  matricula_id: number;
  servico_id: number;
  data_pagamento?: Date | null; // Pode ser nulo ou não definido
  valor_pago: number;
  pessoa: string;
} // helpers/permissaoTypes.ts

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

export interface LivroType {
  id: number;
  titulo: string;
  autor_nome: string;
  autor_bio?: string; // Biografia do autor, opcional
  categoria_nome: string;
  categoria_descricao?: string; // Descrição da categoria, opcional
  isbn: string;
  ano_publicacao: number; // Ano é representado como um número (ex: 2024)
  estado: boolean; // Estado do livro (ativo/inativo)
  localizacao?: string;
}

export interface AlunoTypeCopia {
  id: number;
  aluno: string;
  pessoa: string;
  data_nascimento: string; // Data é representada como string no formato 'YYYY-MM-DD'
  genero: "Masculino" | "Feminino" | "Outro";
  imagem: string;
  idade: number;
  matricula_id: number;
  classe: string;
  turma: string;
  turno: string;
  diretor: string;
  encarregado: string;
  telefone: number;
  endereco_completo: string;
  grau: string;
}
export interface AlunoType {
  id: number;
  pessoa: PessoaType;
  aluno?: string;
  turma_id: number;
  classe_id?: number;
  turno_id?: number;
  encarregado?: EncarregadoType;
  endereco?: EnderecoType;
  imagem?: string;
  classe?: string;
  turma?: string;
  turno?: string;
  diretor?: string;
  telefone?: number;
  grau?: string;
  genero?: string;
  data_nascimento?: Date;
  data_matricula?: Date;
  nome_encarregado?: string;
}

export interface AlunoTypeHome {
  id: number;
  pessoa: string;
  aluno?: string;
  turma_id: number;
  classe_id?: number;
  turno_id?: number;
  encarregado?: EncarregadoType;
  endereco?: EnderecoType;
  imagem?: string;
  classe?: string;
  turma?: string;
  turno?: string;
  diretor?: string;
  telefone?: number;
  grau?: string;
  genero?: string;
  data_nascimento?: Date;
  data_matricula?: Date;
  nome_encarregado?: string;
}

// helpers/professorTypes.ts

export interface ProfessorType {
  nome: string;
  id: number;
  funcionario_id?: number;

  especializacao?: string; // Pode ser opcional se for NULL no banco de dados
}
export interface ProfessorTypeGeral {
  id: number;
  pessoa: PessoaType;
  contatos: ContatoType[]; // Array de contatos do encarregado
  documentos: DocumentoType[];
  endereco: EnderecoType;
  funcionario: FuncionarioType;
  especializacao_id: number; // Pode ser opcional se for NULL no banco de dados
}

// helpers/professorDisciplinaTypes.ts

export interface ProfessorDisciplinaType {
  id: number;
  professor_id: number;
  disciplina_id: number;
}
// helpers/professorTurmaTypes.ts

export interface ProfessorTurmaType {
  id: number;
  professor_id: number;
  turma_id: number;
  disciplina_id: number;
}
// helpers/professorTurmaAssTypes.ts

export interface ProfessorTurmaAss {
  assiduidade_id: number;
  professorturma_id: number;
}
// helpers/provasTypes.ts

export interface ProvaType {
  id: number;
  matricula_id: number;
  disciplina_id: number;
  tipo_prova_id: number;
  epoca_id: number;
  nota: number;
  data_prova: string; // Campo opcional, pois pode ser NULL
  estado?: boolean; // Campo opcional, pois pode ser NULL
  aluno: string;
  curso: string;
  turma: { nome: string; id: number };
  classe: { nome: string; id: number };
  detalhes_turma?: string;
  disciplina: string;
  tipoprova: string;
}
// helpers/provinciaTypes.ts

export interface ProvinciaType {
  id: number;
  nome: string;
}

export interface MunicipioType {
  id: number;
  nome: string;
  provincia_id: number;
}

// helpers/salaTypes.ts

export interface Servico {
  id: number;
  nome: string;
  preco: number;
}

export interface TipoProvaType {
  id: number;
  nome: string;
  descricao: string | null;
  estado: boolean;
  data_criacao: string;
  data_remocao: string | null;
  data_alteracao: string;
}

// helpers/tipousuarioTypes.ts

export interface TipoUsuarioType {
  id: number;
  nome: string;
  descricao?: string;
}
// helpers/turmaTypes.ts

export interface TurmaType {
  descricao_completa: string;
  id: number;
  nome: string;
  classe_id: number;
  turno_id: number;
  sala_id: number;
  turma?: string;
  disciplina?: any;
}
// helpers/turnoTypes.ts

export interface TurnoType {
  id: number;
  descricao?: string; // Campo opcional
  funcionario_id: number;
}

export interface FuncionarioType {
  id: number;
  func_pessoa_id: number;
  nome?: string;
  pessoa_id?: number;
  cargo_id: number;
  data_admissao: string;
}

export interface ClasseType {
  id: number;
  nome: string;
  curso_id: number;
}
export interface EnderecoType {
  id: number;
  municipio_id: number;
  numero_casa: string;
  bairro: string;
}

// helpers/encarregadoTypes.ts

export interface EncarregadoType {
  grau: string;
  id: number;
  nome: string; // Nome do encarregado
  data_nascimento: Date; // Data de nascimento do encarregado
  contatos: ContatoType[]; // Array de contatos do encarregado
  documentos: DocumentoType[]; // Array de documentos do encarregado
}

export interface EncarregadoForm {
  grau: string;
  pessoa_id: number;
  matriculas_id: number;
  id: number;
}
export interface EncarregadoAlunoType {
  grau: string;
  pessoa: PessoaType;
  contatos: ContatoType[];
  documentos?: DocumentoType;
  matriculas_id: number;
  id: number;
  endereco?: string;
}

// helpers/contatoTypes.ts
export interface ContatoType {
  id: number;
  cont_pessoa_id: number; // ID da pessoa associada ao contato
  valor: string; // Valor do contato (e.g. email, telefone)
  tipo: "email" | "telefone"; // Tipo de contato
}

// helpers/documentoTypes.ts
export interface DocumentoType {
  id: number;
  doc_pessoa_id: number; // ID da pessoa associada ao documento
  tipo: "BI" | "Passaporte" | "Outro"; // Tipo de documento
  numero: string; // Número do documento
  data_validade?: string; // Data de validade do documento, pode ser nulo
}

// src/helpers/types.ts

// src/helpers/types.ts

export interface DisciplinaType {
  id: number;
  nome: string;
  estado?: boolean; // Opcional, pode ser NULL no banco de dados
  data_criacao?: Date; // Utilizando o tipo Date
  data_remocao?: Date; // Utilizando o tipo Date
  data_alteracao?: Date; // Utilizando o tipo Date
  disciplina?: string;
}

// src/helpers/types.ts

// src/helpers/types.ts

export interface CursoType {
  id: number;
  nome: string;
  descricao?: string; // Opcional, pode ser NULL no banco de dados
  estado?: boolean; // Opcional, pode ser NULL no banco de dados
  data_criacao?: Date; // Utilizando o tipo Date
  data_remocao?: Date; // Utilizando o tipo Date
  data_alteracao?: Date; // Utilizando o tipo Date
}

// src/helpers/types.ts

export interface AnoLetivoType {
  id: number;
  dataInicio?: Date; // Opcional, pode ser NULL no banco de dados
  dataFim?: Date; // Opcional, pode ser NULL no banco de dados
  descricao?: string; // Opcional, pode ser NULL no banco de dados
  estado?: boolean; // Opcional, pode ser NULL no banco de dados
  data_criacao?: Date; // Utilizando o tipo Date
  data_remocao?: Date; // Utilizando o tipo Date
  data_alteracao?: Date; // Utilizando o tipo Date
}
// src/helpers/types.ts

export interface SalaType {
  id: number;
  descricao?: string; // Opcional, pode ser NULL no banco de dados
  estado?: boolean; // Opcional, pode ser NULL no banco de dados
  data_criacao?: Date; // Utilizando o tipo Date
  data_remocao?: Date; // Utilizando o tipo Date
  data_alteracao?: Date; // Utilizando o tipo Date
}

export interface ClasseDisciplinaType {
  id: number;
  classe_id: number;
  disciplina_id: number;
  estado: boolean | number; // Pode ser `tinyint(1)` no banco de dados, mas pode ser representado como boolean ou number
  data_criacao: Date; // Usando o tipo Date para datas
  data_remocao?: Date | null; // Pode ser null
  data_alteracao: Date; // Usando o tipo Date para datas
}
// src/helpers/types/EpocaType.ts

export interface EpocaType {
  descricao_completa: string;
  id: number;
  descricao: string | null;
  numero: number | null;
  estado: boolean | null;
  data_criacao: Date | null;
  data_remocao: Date | null;
  data_alteracao: Date | null;
  anoLetivo_id: number;
  dataInicio: Date | null;
  dataFim: Date | null;
}
// src/helpers/types.ts

export interface EpocaForm {
  id: number;
  descricao: string;
  numero: number; // Altere para number
  estado: boolean;
  anoLetivo_id: number; // Altere para number
  dataInicio: string;
  dataFim: string;
}

export interface EpocaTurmaForm {
  id: number;
  epoca_id: number;
  turma_id: number;
  estado: boolean;
  data_criacao: string;
  data_remocao: string | null;
  data_alteracao: string;
}
export interface HorarioType {
  id: number;
  diaSemana:
    | "Segunda"
    | "Terça"
    | "Quarta"
    | "Quinta"
    | "Sexta"
    | "Sabado"
    | "Domingo"
    | "";
  horaInicial: string | null;
  horaFinal: string | null;
  estado: boolean | number; // Pode ser booleano ou 1/0
  epoca_id: number;
}
export interface Aluno {
  id: number;
  nome: string;
}

export interface Disciplina {
  id: number;
  nome: string;
}

export interface Nota {
  alunoId: number;
  disciplinaId: number;
  nota: number;
}

// helpers/types.ts

export interface EspecializacaoType {
  id: number;
  nome: string;
  descricao?: string;
}
// helpers/types.ts

export interface MeioType {
  id: number;
  tipo_meio: string;
  descricao?: string; // Pode ser nulo
  estado_meio?: "Bom" | "Mau" | "Razoavel"; // Enum com valores permitidos
  estado: boolean; // 0 ou 1
  data_criacao: Date | null; // Usar Date para manipulação de data
  data_alteracao: Date | null; // Usar Date para manipulação de data
  data_remocao?: Date | null; // Usar Date para manipulação de data, pode ser nulo
  localizacao?: string;
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
