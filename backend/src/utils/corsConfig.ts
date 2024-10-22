export const corsOptions = {
  origin: "*", // URL do frontend
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Permite envio de cookies e cabeçalhos de autorização
};
