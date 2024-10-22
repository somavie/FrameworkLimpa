// models/Permissao.ts
export interface Permissao {
  id: number;
  usuario_id: number;
  delete_permissao?: boolean;
  update_permissao?: boolean;
  view_permissao?: boolean;
  create_permissao?: boolean;
  estado?: boolean;
  data_criacao?: Date;
  data_remocao?: Date;
  data_alteracao?: Date;
}
