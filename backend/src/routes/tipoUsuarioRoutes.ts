import { Router } from "express";
import * as tipoUsuarioController from "../controllers/tipoUsuarioController";

const router = Router();

router.post("/", tipoUsuarioController.createTipoUsuario);
router.get("/", tipoUsuarioController.getAllTipoUsuario);
router.get("/:id", tipoUsuarioController.getTipoUsuarioById);
router.put("/:id", tipoUsuarioController.updateTipoUsuario);
router.delete("/:id", tipoUsuarioController.deleteTipoUsuario);

export default router;
