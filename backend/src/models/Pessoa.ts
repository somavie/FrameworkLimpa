// models/Pessoa.ts
export interface Pessoa {
  id: number;
  nome: string;
  data_nascimento: Date;
  genero: "Masculino" | "Feminino" | "Outro";
  estado?: boolean;
  data_criacao?: Date;
  data_remocao?: Date;
  data_alteracao?: Date;
  endereco_id: number;
}
