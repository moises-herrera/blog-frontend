import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

interface SettingsMenuProps {
  onClickUpdate: () => void;
  onClickDelete: () => void;
  variant?: string;
}

export const SettingsMenu = ({
  onClickUpdate,
  onClickDelete,
  variant = "outline",
}: SettingsMenuProps) => {
  return (
    <Menu variant={variant}>
      <MenuButton>
        <i className="text-xl fa-solid fa-ellipsis-vertical"></i>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={onClickUpdate}
          icon={<i className="fa-solid fa-pen-to-square"></i>}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={onClickDelete}
          icon={<i className="fa-solid fa-trash"></i>}
        >
          Eliminar
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
