import express from "express";
import * as enderecoController from "../controllers/enderecoController";

const router = express.Router();

router.post("/", enderecoController.createEndereco);
router.get("/", enderecoController.getAllEnderecos);
router.get("/:id", enderecoController.getEnderecoById);
router.put("/:id", enderecoController.updateEndereco);
router.delete("/:id", enderecoController.deleteEndereco);

export default router;
