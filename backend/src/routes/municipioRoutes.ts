import { Router } from "express";
import * as municipioController from "../controllers/municipioController";

const router = Router();

router.post("/", municipioController.createMunicipio);
router.get("/", municipioController.getAllMunicipios);
router.get("/:id", municipioController.getMunicipioById);
router.put("/:id", municipioController.updateMunicipio);
router.delete("/:id", municipioController.deleteMunicipio);

export default router;
