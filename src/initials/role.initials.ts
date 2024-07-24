import { RoleCode } from "../helpers/enum";

export const Roles = [
  {
    roleCode: RoleCode.ADMIN,
    roleName: "Administrator",
    permissions: [],
  },
  {
    roleCode: RoleCode.USER,
    roleName: "User",
    permissions: [],
  },
  {
    roleCode: RoleCode.GUEST,
    roleName: "Guest",
    permissions: [],
  },
];
