import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

interface SettingsMenuProps {
  onClickUpdate: () => void;
  onClickDelete: () => void;
}

export const SettingsMenu = ({
  onClickUpdate,
  onClickDelete,
}: SettingsMenuProps) => {
  return (
    <Menu>
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
