import { Request, Response } from "express";
import { Product } from "../entities/Product";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";
import { getCategories, getProducts } from "../models/productModel";

const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, categoryId } = req.body;
  try {
    const category = await categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const isExistProduct = await productRepository.findOne({
      where: {
        name: name,
      },
    });

    if (isExistProduct) {
      return res.status(409).json({ message: "Product already exist" });
    }

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = { id: categoryId } as any;

    await productRepository.save(product);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error creating product" });
  }
};

export const fetchProducts = async (req: Request, res: Response) => {
  try {
    const products = await productRepository.find({ relations: ["category"] });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;
  try {
    const product = await productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = { id: categoryId } as any;

    await productRepository.save(product);
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await productRepository.delete(id);
    if (result.affected === 0)
      return res.status(404).json({ message: "Product not found" });
    return res.status(201).json({ message: "Delete category successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting product" });
  }
};

export const showProductList = async (req: Request, res: Response) => {
  const categoryIds = req.query.categoryIds
    ? Array.isArray(req.query.categoryIds)
      ? req.query.categoryIds.map((id) => String(id))
      : [String(req.query.categoryIds)]
    : [];

  try {
    const categories = await getCategories();
    const products = await getProducts(categoryIds);
    res.render("products", {
      products: products.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
      })),
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
      })),
      selectedCategories: categoryIds,
    });
  } catch (error) {
    console.error("Error fetching products or categories:", error);
    res.status(500).send("Internal Server Error");
  }
};
