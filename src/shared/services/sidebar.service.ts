import { LinkItem } from "src/interfaces";

/**
 * Sidebar links.
 */
export const linkItems: LinkItem[] = [
  {
    path: "/",
    label: "Inicio",
    icon: "fa-solid fa-house",
  },
  {
    path: "/search",
    label: "Buscar",
    icon: "fa-solid fa-magnifying-glass",
  },
  {
    path: "/profile/:username",
    label: "Perfil",
    icon: "fa-solid fa-circle-user",
  },
  {
    path: "/users",
    label: "Usuarios",
    icon: "fa-solid fa-user-group",
  },
  {
    path: "/chats",
    label: "Chats",
    icon: "fa-regular fa-comment",
  },
  {
    path: "/settings",
    label: "Configuración",
    icon: "fa-solid fa-gear",
  },
];
