import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { deleteComment } from "src/store/comment";
import { AppDispatch } from "src/store/types";
interface Props {
  user: string;
  comment: string;
  img: string;
  userId: string;
  commentId: string;
  commenkey: string;
}

export const CommentCard = ({
  user,
  comment,
  img,
  userId,
  commentId,
  commenkey,
}: Props) => {
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const dispatch = useDispatch<AppDispatch>();
  const onClickDelete = () => {
    console.log(commenkey);
    dispatch(deleteComment(commenkey as string));
  };
  return (
    <div className="flex mb-4">
      <div className="pl-3 pr-4">
        <Avatar size="lg" name="Non" src={img} />
      </div>
      <div className="flex flex-col w-full text-white">
        <div className="flex flex-row justify-between w-full">
          <p className="font-bold text-[16px]">{user}</p>
          {currentUser?._id === userId ? (
            <Menu>
              <MenuButton marginRight={"10px"}>
                <i className="text-xl fa-solid fa-ellipsis-vertical"></i>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => console.log("onClickUpdate")}
                  icon={
                    <i className="text-black fa-solid fa-pen-to-square"></i>
                  }
                >
                  <span className="text-black">Editar</span>
                </MenuItem>
                <MenuItem
                  onClick={onClickDelete}
                  icon={<i className="text-black fa-solid fa-trash"></i>}
                >
                  <span className="text-black">Eliminar</span>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : currentUser?._id === commentId ? (
            <Menu>
              <MenuButton marginRight={"10px"}>
                <i className="text-xl fa-solid fa-ellipsis-vertical"></i>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => console.log("onClickUpdate")}
                  icon={
                    <i className="text-black fa-solid fa-pen-to-square"></i>
                  }
                >
                  <span className="text-black">Editar</span>
                </MenuItem>
                <MenuItem
                  onClick={onClickDelete}
                  icon={<i className="text-black fa-solid fa-trash"></i>}
                >
                  <span className="text-black">Eliminar</span>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </div>
        <p className="pr-3 text-[14px]">{comment}</p>
      </div>
    </div>
  );
};
