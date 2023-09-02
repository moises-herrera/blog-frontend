import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Sidebar } from ".";
import { UserCard } from "./UserCard";
import { FollowBoton } from "./FollowBoton";
import { datademo } from "./DataDemo";

export const RightSidebar = () => {
  return (
    <Sidebar align="right">
      <div className="pt-10">
        <InputGroup backgroundColor={"#434343"} rounded={"20px"}>
          <InputLeftElement className="py-8 pl-2 pr-2">
            <i className="text-[25px] pl-2 text-color-icon fa-solid fa-magnifying-glass"></i>
          </InputLeftElement>
          <Input
            className="py-8"
            focusBorderColor="#434343"
            type="text"
            placeholder="Buscar perfiles"
            border={"none"}
            rounded={"20px"}
          />
        </InputGroup>
      </div>
      <div className="text-[#E0E0E0] pt-10 text-[30px] font-bold pb-3">
        <p>Seguidos</p>
      </div>
      <div className="h-[310px] overflow-auto scrollable-div">
        {datademo.map((item) => (
          <div key={item.user}>
            <UserCard user={item.user}>
              <FollowBoton title="No seguir" />
            </UserCard>
          </div>
        ))}
      </div>
      <div className="text-[#E0E0E0] pt-5 text-[30px] font-bold pb-3">
        <p>Seguir</p>
      </div>
      <div className="h-[310px] overflow-auto scrollable-div">
        {datademo.map((item) => (
          <div key={item.user}>
            <UserCard user={item.user}>
              <FollowBoton title="Seguir" />
            </UserCard>
          </div>
        ))}
      </div>
    </Sidebar>
  );
};
