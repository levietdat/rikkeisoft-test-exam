import { Request, Response, NextFunction } from "express";
import { permissionsConfig } from "../config/permissions-config";
import { AppDataSource } from "../data-source";
import { Permission } from "../entities/Permission";
import { Role } from "../entities/Role";

const permissionRepository = AppDataSource.getRepository(Permission);
const roleRepository = AppDataSource.getRepository(Role);

export const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  const roleOfUser = await roleRepository.findOne({
    where: {
      user: {
        id: user?.id,
      },
    },
    relations: ["permissions"],
  });
  if (!user || !roleOfUser) {
    return res.status(403).json({ message: "No role assigned to user" });
  }

  const { method } = req;
  const permissionCode = permissionsConfig[req.route.path]?.[method];
  if (!permissionCode) {
    return res
      .status(403)
      .json({ message: "No permission configured for this route" });
  }

  try {
    const isAccess = roleOfUser.permissions.filter(
      (per) => per.permissionCode === permissionCode,
    );
    if (isAccess.length === 0) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error checking permissions" });
  }
};
