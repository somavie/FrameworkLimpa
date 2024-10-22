import municipio from "@/app/(app)/admin/configuracao/municipio/page";
import { number, mixed, boolean, object, ref, date, string } from "yup";
import * as yup from "yup";

export const PagamentoSchema = object().shape({
  matricula_id: yup.number().required("O ID da matrícula é obrigatório"),
  servico_id: yup.number().required("O ID do serviço é obrigatório"),
  data_pagamento: date()
    .nullable() // Permite que seja nulo se não for obrigatório
    .optional(),
  valor_pago: yup
    .number()
    .required("O valor pago é obrigatório")
    .positive("O valor pago deve ser um número positivo"),
});

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

export const CargoSchema = object().shape({
  nome: string().required("Nome é obrigatório"),
  descricao: string().required("Descrição é obrigatório"),
});

export const MunicipioSchema = object().shape({
  nome: string().required("Nome é obrigatório"),
  provincia_id: string().required("Provincia é obrigatório"),
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

export const ProfessorSchemaOnly = object().shape({
  funcionario_id: number().required("O ID do funcionário é obrigatório"),
  especializacao: string()
    .nullable()
    .max(100, "A especialização deve ter no máximo 100 caracteres"),
});

export const ProfessorSchema = yup.object().shape({
  pessoa: yup.object().shape({
    nome: yup
      .string()
      .required("O nome é obrigatório")
      .max(100, "O nome deve ter no máximo 100 caracteres"),

    data_nascimento: yup.date().required("A data de nascimento é obrigatória"),

    genero: yup.string().required("O gênero é obrigatório"),
  }),

  contatos: yup
    .array()
    .of(
      yup.object().shape({
        tipo: yup.string().required("O tipo de contato é obrigatório"),
        valor: yup
          .string()
          .required("O valor do contato é obrigatório")
          .max(50, "O valor do contato deve ter no máximo 50 caracteres"),
      })
    )
    .min(1, "É necessário adicionar ao menos um contato"),

  documentos: yup
    .array()
    .of(
      yup.object().shape({
        tipo: yup.string().required("O tipo de documento é obrigatório"),
        numero: yup
          .string()
          .required("O número do documento é obrigatório")
          .max(20, "O número do documento deve ter no máximo 20 caracteres"),
        data_validade: yup
          .date()
          .required("A data de validade do documento é obrigatória"),
      })
    )
    .min(1, "É necessário adicionar ao menos um documento"),

  endereco: yup.object().shape({
    municipio_id: yup.string().required("O município é obrigatório"),
    numero_casa: yup
      .string()
      .required("O número da casa é obrigatório")
      .max(10, "O número da casa deve ter no máximo 10 caracteres"),
    bairro: yup
      .string()
      .required("O bairro é obrigatório")
      .max(100, "O bairro deve ter no máximo 100 caracteres"),
  }),

  funcionario: yup.object().shape({
    cargo_id: yup.string().required("O cargo é obrigatório"),
    data_admissao: yup.date().required("A data de admissão é obrigatória"),
  }),

  especializacao: yup
    .string()
    .nullable()
    .max(100, "A especialização deve ter no máximo 100 caracteres"),
  especializacao_id: yup.number().nullable(),
});

export const ProfessorDisciplinaSchema = object().shape({
  professor_id: number().required("O ID do professor é obrigatório"),
  disciplina_id: number().required("O ID da disciplina é obrigatório"),
});

export const ProfessorTurmaSchema = object().shape({
  professor_id: number().required("O ID do professor é obrigatório"),
  turma_id: number().required("O ID da turma é obrigatório"),
  disciplina_id: number().required("O ID da disciplina é obrigatório"),
});

export const ProfessorTurmaAssSchema = object().shape({
  assiduidade_id: number().required("O ID da assiduidade é obrigatório"),
  professorturma_id: number().required("O ID do professor turma é obrigatório"),
});

export const ProvaSchema = object().shape({
  matricula_id: number().required("O ID da matrícula é obrigatório"),
  disciplina_id: number().required("O ID da disciplina é obrigatório"),
  tipo_prova_id: number().required("O ID do tipo de prova é obrigatório"),
  nota: number()
    .required("A nota é obrigatória")
    .min(0, "A nota mínima é 0")
    .max(100, "A nota máxima é 100"),
  data_prova: date().nullable(), // Permite nulo

  epoca_id: number().required("O ID da época é obrigatório"),
});

export const ProvinciaSchema = object().shape({
  nome: string()
    .required("O nome da província é obrigatório")
    .max(100, "O nome pode ter no máximo 100 caracteres"),
});

export const SalaSchema = object().shape({
  descricao: string()
    .required("O numero da sala é obrigatório")
    .optional()
    .max(45, "A descrição pode ter no máximo 45 caracteres"), // Opcional e pode ser nulo
});

export const ServicoSchema = object().shape({
  nome: string()
    .required("O nome é obrigatório")
    .max(100, "O nome pode ter no máximo 100 caracteres"),
  preco: number()
    .required("O preço é obrigatório")
    .min(0, "O preço deve ser positivo")
    .max(99999999.99, "O preço deve ter no máximo 10 dígitos no total"),
});

export const MatriculaSchema = yup.object().shape({
  pessoa: yup.object().shape({
    nome: yup.string().required("O nome é obrigatório"),
    data_nascimento: yup.date().required("Data de nascimento é obrigatória"),
    genero: yup.string().required("Gênero é obrigatório"),
    municipio_id: yup.string().required("Naturalidade é Obrigatoria"),
  }),
  turma_id: yup.number().required("A turma é obrigatória"),
});

export const TipoProvaSchema = yup.object().shape({
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  descricao: yup
    .string()
    .nullable()
    .max(500, "A descrição deve ter no máximo 500 caracteres"),
});

export const TipoUsuarioSchema = object().shape({
  nome: string()
    .required("O nome é obrigatório")
    .max(50, "O nome pode ter no máximo 50 caracteres"),
  descricao: string().optional(), // Descrição é opcional
});

export const TurmaSchema = object().shape({
  nome: string()
    .required("O nome é obrigatório")
    .max(50, "O nome pode ter no máximo 50 caracteres"),
  classe_id: number().integer().required("O campo classe_id é obrigatório"),
  turno_id: number().integer().required("O campo turno_id é obrigatório"),
  sala_id: number().integer().required("O campo sala_id é obrigatório"),
});

export const ClasseSchema = object().shape({
  nome: string()
    .required("O nome é obrigatório")
    .max(50, "O nome pode ter no máximo 50 caracteres"),
  curso_id: number().integer().required("O campo classe_id é obrigatório"),
});

export const TurnoSchema = object().shape({
  descricao: string()
    .max(45, "A descrição pode ter no máximo 45 caracteres")
    .nullable(),
  funcionario_id: number()
    .integer()
    .required("O campo funcionario_id é obrigatório"),
});

export const FuncionarioSchema = object().shape({
  pessoa_id: number().integer().required("Selecione a Pessoa"),
  cargo_id: number().integer().required("Selecione o Cargo"),
});
export const CursoSchema = object().shape({
  nome: string()
    .required("O nome é obrigatório")
    .max(50, "O nome pode ter no máximo 50 caracteres"),
  descricao: string()
    .nullable()
    .max(200, "O Descriçao pode ter no máximo 200 caracteres"),
});

export const EnderecoSchema = object().shape({
  municipio_id: number().integer().required("O nome é obrigatório"),
  numero_casa: string()
    .nullable()
    .max(200, "O Descriçao pode ter no máximo 200 caracteres"),
  bairro: string()
    .nullable()
    .max(200, "O Descriçao pode ter no máximo 200 caracteres"),
});

export const EncarregadoSchema = yup.object().shape({
  // Campos relacionados à tabela `pessoa`
  pessoa: yup.object().shape({
    id:yup.number().required("O Encarregado obrigatório")
  }),

  
  
});
export const EncarregadoSchemaCopia = yup.object().shape({
  // Campos relacionados à tabela `pessoa`
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .max(100, "O nome pode ter no máximo 100 caracteres"),
  data_nascimento: yup
    .date()
    .required("A data de nascimento é obrigatória")
    .typeError("Data de nascimento inválida"),
  // Campos relacionados à tabela `contato`
  contatos: yup.array().of(
    yup.object().shape({
      valor: yup
        .string()
        .required("O contato é obrigatório")
        .max(50, "O contato pode ter no máximo 50 caracteres"),
      tipo: yup
        .string()
        .oneOf(["email", "telefone"], "Tipo de contato inválido")
        .required("O tipo de contato é obrigatório"),
    })
  ),

  // Campos relacionados à tabela `documento`
  documentos: yup.array().of(
    yup.object().shape({
      tipo: yup
        .string()
        .oneOf(["BI", "Passaporte", "Outro"], "Tipo de documento inválido")
        .required("O tipo de documento é obrigatório"),
      numero: yup
        .string()
        .required("O número do documento é obrigatório")
        .max(20, "O número do documento pode ter no máximo 20 caracteres"),
      data_validade: yup
        .date()
        .nullable()
        .typeError("Data de validade inválida"),
    })
  ),
});

export const ClasseDisciplinaSchema = yup.object().shape({
  classe_id: yup.number().required("Classe é obrigatória"),
  disciplina_id: yup.number().required("Disciplina é obrigatória"),
});

// Schema de validação para Ano Letivo
export const AnoLetivoSchema = yup.object().shape({
  dataInicio: yup.date().required("Data de início é obrigatória"),
  dataFim: yup.date().required("Data de fim é obrigatória"),
  descricao: yup
    .string()
    .max(45, "Descrição não pode ter mais de 45 caracteres"),
});

// Schema de validação para Disciplina
export const DisciplinaSchema = yup.object().shape({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .max(100, "Nome não pode ter mais de 100 caracteres"),
});
// src/helpers/schemas/EpocaSchema.ts

export const EpocaSchema = yup.object().shape({
  id: yup.number().required("ID é obrigatório"),
  descricao: yup.string().nullable(),
  numero: yup.number().nullable(),
  estado: yup.boolean().nullable(),
  anoLetivo_id: yup.number().required("Ano Letivo é obrigatório"),
  dataInicio: yup.date().nullable(),
  dataFim: yup.date().nullable(),
});

export const EpocaTurmaSchema = yup.object().shape({
  epoca_id: yup
    .number()
    .required("É necessário selecionar uma época.")
    .positive("A época deve ser um número válido."),
  turma_id: yup
    .number()
    .required("É necessário selecionar uma turma.")
    .positive("A turma deve ser um número válido."),
  estado: yup.boolean().required("O estado é obrigatório."),
});

export const HorarioSchema = yup.object().shape({
  diaSemana: yup
    .string()
    .oneOf(
      ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
      "Dia da semana inválido"
    )
    .required("Dia da semana é obrigatório"),
  horaInicial: yup.string().required("Hora inicial é obrigatória"),
  horaFinal: yup.string().required("Hora final é obrigatória"),
  epoca_id: yup.number().required("Época é obrigatória").positive().integer(),
  estado: yup.boolean(), // Não é obrigatório
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

export const EspecializacaoSchema = yup.object().shape({
  nome: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),
  descricao: yup
    .string()
    .required("A descrição é obrigatória.")
    .min(1, "A descrição deve ter pelo menos caracteres.")
    .max(500, "A descrição deve ter no máximo 500 caracteres."),
});

export const LivroSchema = yup.object().shape({
  titulo: yup.string().required("Título é obrigatório"),
  autor_nome: yup.string().required("Nome do autor é obrigatório"),
  autor_bio: yup.string().optional(), // Biografia do autor é opcional
  categoria_nome: yup.string().required("Nome da categoria é obrigatório"),
  categoria_descricao: yup.string().optional(), // Descrição da categoria é opcional
  isbn: yup.string().required("ISBN é obrigatório"),
  ano_publicacao: yup
    .number()
    .required("Ano de publicação é obrigatório")
    .min(1000)
    .max(new Date().getFullYear(), "Ano de publicação deve ser válido"),
  estado: yup.boolean().default(true), // Estado do livro, padrão é ativo
});
export const MeioSchema = yup.object().shape({
  tipo_meio: yup.string().required("Nome é obrigatório"),
  estado_meio: yup
    .mixed<"Bom" | "Mau" | "Razoavel">()
    .oneOf(
      ["Bom", "Mau", "Razoavel"],
      "Estado do meio é obrigatório e deve ser um dos seguintes: Bom, Mau, Razoável"
    )
    .required("Estado do meio é obrigatório"),
  estado: yup.boolean().default(true), // Estado do meio, padrão é ativo
});
