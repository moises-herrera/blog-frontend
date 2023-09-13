import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

interface SettingsMenuProps {
  variant?: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  onClickUpdate: () => void;
  onClickDelete: () => void;
}

export const SettingsMenu = ({
  variant = "outline",
  canUpdate = true,
  canDelete = true,
  onClickUpdate,
  onClickDelete,
}: SettingsMenuProps) => {
  return (
    <Menu variant={variant}>
      <MenuButton>
        <i className="text-xl fa-solid fa-ellipsis-vertical"></i>
      </MenuButton>
      <MenuList>
        {canUpdate && (
          <MenuItem
            onClick={onClickUpdate}
            icon={<i className="fa-solid fa-pen-to-square"></i>}
          >
            Editar
          </MenuItem>
        )}
        {canDelete && (
          <MenuItem
            onClick={onClickDelete}
            icon={<i className="fa-solid fa-trash"></i>}
          >
            Eliminar
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
