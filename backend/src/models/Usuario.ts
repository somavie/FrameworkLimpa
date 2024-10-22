// models/Usuario.ts
export interface Usuario {
  id: number;
  pessoa_id: number;
  nomeUsuario: string;
  senha: string;
  tipo_usuario_id: number;
  delete_permissao?: boolean; // Permissão para deletar
  update_permissao?: boolean; // Permissão para atualizar
  view_permissao?: boolean; // Permissão para visualizar
  create_permissao?: boolean; // Permissão para criar
  estado?: boolean; // Estado ativo ou inativo
  data_criacao?: Date; // Data de criação
  data_remocao?: Date; // Data de remoção
  data_alteracao?: Date; // Data de alteração
}
