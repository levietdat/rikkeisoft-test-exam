type PermissionMap = {
  [key: string]: {
    [method: string]: string;
  };
};

export const permissionsConfig: PermissionMap = {
  "/products": {
    GET: "VIEW_PRODUCT",
    POST: "CREATE_PRODUCT",
  },
  "/products/:id": {
    PUT: "EDIT_PRODUCT",
    DELETE: "DELETE_PRODUCT",
  },
  "/categories": {
    GET: "VIEW_CATEGORY",
    POST: "CREATE_CATEGORY",
  },
  "/categories/:id": {
    PUT: "EDIT_CATEGORY",
    DELETE: "DELETE_CATEGORY",
  },
};
