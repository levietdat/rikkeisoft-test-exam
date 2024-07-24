import { RoleCode } from "../helpers/enum";

export const Users = [
  {
    email: "admin@example.com",
    password: "123456",
    role: {
      roleCode: RoleCode.ADMIN,
    },
  },
  {
    email: "user@example.com",
    password: "123456",
    role: {
      roleCode: RoleCode.USER,
    },
  },
];
