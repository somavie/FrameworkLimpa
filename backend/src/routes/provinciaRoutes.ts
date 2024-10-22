import { Router } from "express";
import * as provinciaController from "../controllers/provinciaController";

const router = Router();

router.post("/", provinciaController.createProvincia);
router.get("/", provinciaController.getAllProvincia);
router.get("/:id", provinciaController.getProvinciaById);
router.put("/:id", provinciaController.updateProvincia);
router.delete("/:id", provinciaController.deleteProvincia);

export default router;
