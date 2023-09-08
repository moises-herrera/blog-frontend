import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  FollowButton,
  UserCard,
  Sidebar,
  Loading,
} from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { getFollowers, getFollowing } from "src/store/users";

export const RightSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useTypedSelector(({ auth }) => auth);
  const { followers, following, followersLoading, followingLoading } =
    useTypedSelector(({ users }) => users);

  useEffect(() => {
    dispatch(getFollowers(user?._id as string));
    dispatch(getFollowing(user?._id as string));
  }, []);

  const onClickFollow = () => {};

  const onClickUnfollow = () => {};

  return (
    <Sidebar align="right" cssClass="hidden lg:block">
      <div className="pt-10">
        <InputGroup className="mb-5">
          <InputLeftElement pointerEvents="none">
            <i className="text-white fa-solid fa-magnifying-glass"></i>
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Buscar tema de interes"
            textColor={"#ffffff"}
          />
        </InputGroup>
      </div>
      <div className="text-[#E0E0E0] pt-10 text-[30px] font-bold pb-3">
        <p>Seguidos</p>
      </div>
      <div className="users-list h-[310px] overflow-auto scrollable-div">
        {!followingLoading ? (
          following.map((user) => (
            <UserCard key={user.username} user={user}>
              <FollowButton title="No seguir" onOpen={onClickUnfollow} />
            </UserCard>
          ))
        ) : (
          <Loading />
        )}
      </div>
      <div className="text-[#E0E0E0] pt-5 text-[30px] font-bold pb-3">
        <p>Seguidores</p>
      </div>
      <div className="users-list h-[310px] overflow-auto scrollable-div">
        {!followersLoading ? (
          followers.map((user) => (
            <UserCard key={user.username} user={user}>
              <FollowButton title="Seguir" onOpen={onClickFollow} />
            </UserCard>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </Sidebar>
  );
};
