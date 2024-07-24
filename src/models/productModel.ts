import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";

export const getProducts = async (categoryIds: string[]) => {
  const productRepository = AppDataSource.getRepository(Product);

  const query = productRepository
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.category", "category");

  if (categoryIds.length > 0) {
    query.where("category.id IN (:...categoryIds)", { categoryIds });
  }

  return await query.getMany();
};

export const getCategories = async () => {
  const categoryRepository = AppDataSource.getRepository(Category);
  return await categoryRepository.find();
};
