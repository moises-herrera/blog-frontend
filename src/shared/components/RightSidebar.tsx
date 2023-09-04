import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Sidebar } from ".";
import { UserCard } from "./UserCard";
import { FollowBoton } from "./FollowBoton";
import { datademo } from "./DataDemo";

interface Props {
  onOpen: () => void;
}

export const RightSidebar = ({ onOpen }: Props) => {
  return (
    <Sidebar align="right">
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
      <div className="h-[310px] overflow-auto scrollable-div">
        {datademo.map((item) => (
          <div key={item.user}>
            <UserCard user={item.user} img={item.img}>
              <FollowBoton title="No seguir" onOpen={onOpen} />
            </UserCard>
          </div>
        ))}
      </div>
      <div className="text-[#E0E0E0] pt-5 text-[30px] font-bold pb-3">
        <p>Seguidores</p>
      </div>
      <div className="h-[310px] overflow-auto scrollable-div">
        {datademo.map((item) => (
          <div key={item.user}>
            <UserCard user={item.user} img={item.img}>
              <FollowBoton title="Seguir" onOpen={onOpen} />
            </UserCard>
          </div>
        ))}
      </div>
    </Sidebar>
  );
};
