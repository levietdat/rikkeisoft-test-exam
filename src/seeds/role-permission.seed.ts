import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";
import { Roles } from "../initials/role.initials";
import { RoleCode } from "../helpers/enum";

export default class CreateRolesAndPermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const roleRepository = connection.getRepository(Role);
    const permissionRepository = connection.getRepository(Permission);
    const savedRoles = await roleRepository.save(Roles);

    const adminRole = savedRoles.find(
      (role) => role.roleCode === RoleCode.ADMIN,
    );
    const userRole = savedRoles.find((role) => role.roleCode === RoleCode.USER);

    if (!adminRole || !userRole) {
      throw new Error("Roles not created successfully");
    }

    const permissions = [
      {
        permissionCode: "CREATE_PRODUCT",
        permissionDesc: "Create product",
        permissionName: "Create Product",
        role: adminRole,
      },
      {
        permissionCode: "EDIT_PRODUCT",
        permissionDesc: "Edit product",
        permissionName: "Edit Product",
        role: adminRole,
      },
      {
        permissionCode: "DELETE_PRODUCT",
        permissionDesc: "Delete product",
        permissionName: "Delete Product",
        role: adminRole,
      },
      {
        permissionCode: "VIEW_PRODUCT",
        permissionDesc: "View product",
        permissionName: "View Product",
        role: adminRole,
      },
      {
        permissionCode: "CREATE_CATEGORY",
        permissionDesc: "Create category",
        permissionName: "Create Category",
        role: adminRole,
      },
      {
        permissionCode: "EDIT_CATEGORY",
        permissionDesc: "Edit category",
        permissionName: "Edit Category",
        role: adminRole,
      },
      {
        permissionCode: "DELETE_CATEGORY",
        permissionDesc: "Delete category",
        permissionName: "Delete Category",
        role: adminRole,
      },
      {
        permissionCode: "VIEW_CATEGORY",
        permissionDesc: "View category",
        permissionName: "View Category",
        role: adminRole,
      },
      {
        permissionCode: "VIEW_PRODUCT",
        permissionDesc: "View product",
        permissionName: "View Product",
        role: userRole,
      },
      {
        permissionCode: "VIEW_CATEGORY",
        permissionDesc: "View category",
        permissionName: "View Category",
        role: userRole,
      },
    ];

    await permissionRepository.save(permissions);
  }
}
