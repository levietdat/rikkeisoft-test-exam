import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { checkPermission } from "../middleware/permission.middleware";

const router = Router();

router.post("/categories", authenticateJWT, checkPermission, createCategory);
router.get("/categories", getCategories);
router.put("/categories/:id", authenticateJWT, checkPermission, updateCategory);
router.delete(
  "/categories/:id",
  authenticateJWT,
  checkPermission,
  deleteCategory,
);

export default router;
