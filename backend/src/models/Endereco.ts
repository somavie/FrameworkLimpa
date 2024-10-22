export interface Endereco {
  id: number;
  municipio_id: number;
  numero_casa: string | null;
  bairro: string | null;
  estado: boolean;
  data_criacao: Date;
  data_remocao: Date | null;
  data_alteracao: Date;
}
