import { faPlus, faStore, faUsers } from "@fortawesome/free-solid-svg-icons";
export const Links = [
  {
    path: "users",
    icon: faUsers,
    p: "Users",
    role: "1995",
  },
  {
    path: "user/add",
    icon: faPlus,
    p: "Add User",
    role: "1995",
  },
  {
    path: "categories",
    icon: faStore,
    p: "categores",
    role: ["1995", "1999"],
  },
  {
    path: "category/add",
    icon: faPlus,
    p: "Add Categores",
    role: ["1995", "1999"],
  },
  {
    path: "products",
    icon: faStore,
    p: "Products",
    role: ["1995", "1999"],
  },
  {
    path: "product/add",
    icon: faPlus,
    p: "Add Products",
    role: ["1995", "1999"],
  },
  {
    path: "writer",
    icon: faPlus,
    p: "writer",
    role: ["1995", "2004"],
  },
];
