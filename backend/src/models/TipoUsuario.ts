// models/TipoUsuario.ts
export interface TipoUsuario {
  id: number;
  nome: string;
  descricao?: string;
  estado?: boolean;
  data_criacao?: Date;
  data_remocao?: Date;
  data_alteracao?: Date;
}
