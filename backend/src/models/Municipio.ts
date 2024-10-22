// models/Municipio.ts
export interface Municipio {
  id: number;
  nome: string;
  provincia_id: number;
  estado?: boolean;
  data_criacao?: Date;
  data_remocao?: Date;
  data_alteracao?: Date;
}
