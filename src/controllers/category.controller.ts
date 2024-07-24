import { Request, Response } from "express";
import { Category } from "../entities/Category";
import { AppDataSource } from "../data-source";

const categoryRepository = AppDataSource.getRepository(Category);

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const existingCategory = await categoryRepository.findOne({
      where: {
        name: name,
      },
    });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }
    const category = new Category();
    category.name = name;
    category.key = generateCategoryKey(name);
    await categoryRepository.save(category);
    return res.status(201).json(category);
  } catch (error: any) {
    return res.status(500).json({ message: "Error creating category" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryRepository.find();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching categories" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await categoryRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    const existingCategory = await categoryRepository.findOne({
      where: {
        name: name,
      },
    });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }
    category.name = name;
    category.key = generateCategoryKey(name);
    await categoryRepository.save(category);
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ message: "Error updating category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await categoryRepository.delete(id);
    if (result.affected === 0)
      return res.status(404).json({ message: "Category not found" });

    return res.status(201).json({ message: "Delete category successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting category" });
  }
};

const generateCategoryKey = (categoryName: string) => {
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    categoryName = categoryName.replace(RegExp(from[i], "gi"), to[i]);
  }

  categoryName = categoryName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return categoryName;
};
