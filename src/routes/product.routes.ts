import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
  showProductList,
} from "../controllers/product.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { checkPermission } from "../middleware/permission.middleware";

const router = Router();

router.post("/products", authenticateJWT, checkPermission, createProduct);
router.get("/:id", showProductList);
router.get("/products", fetchProducts);
router.put("/products/:id", authenticateJWT, checkPermission, updateProduct);
router.delete("/products/:id", authenticateJWT, checkPermission, deleteProduct);

export default router;
