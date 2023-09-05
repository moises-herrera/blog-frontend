import { CommentCard } from "./CommentCard";
import { usuarios } from "./DataDemo";
import { FollowBoton } from "./FollowBoton";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  CloseButton,
  Image,
  Avatar,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const CommentsModal = ({ isOpen, onClose, title }: Props) => {
  return (
    <div>
      <Modal
        size={"6xl"}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent background={"#2F2F2F"}>
          <ModalBody margin={"0px"} padding={"0px"}>
            <div className="flex flex-col w-full h-full sm:flex-row">
              <div className="hidden w-full bg-white style-contain-comments lg:w-1/2 lg:block">
                <CloseButton onClick={onClose} />
                <div className="flex justify-center">
                  <Image
                    rounded={"20px"}
                    boxSize="450px"
                    objectFit="cover"
                    src="https://res.cloudinary.com/defqzorba/image/upload/v1693719376/posts/tomjj3ob1wyaeiox5qoh.jpg"
                    alt="Dan Abramov"
                  />
                </div>
                <div className="flex justify-evenly text-[#7B7B7B]">
                  <p>#Wen developer</p>
                  <p>31 de Agosto 2023</p>
                </div>
                <div className="flex justify-center text-[#2F2F2F] text-[22px] pt-2 pb-3">
                  <h2>Metodologia para realizar un producto</h2>
                </div>
                <div className="text-[16px] text-[#2F2F2F] felx justify-center px-5 pb-3">
                  <article>
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with
                    desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum
                  </article>
                </div>
              </div>
              <div className="w-full bg-[#2F2F2F] mt-5 lg:w-1/2 h-full">
                <div className="block lg:hidden">
                  <CloseButton
                    className="  text-[#E0E0E0] pl-3 text-xl pb-3"
                    onClick={onClose}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Avatar
                      marginLeft={"10px"}
                      marginRight={"5px"}
                      size="lg"
                      name="Non"
                      src="https://res.cloudinary.com/defqzorba/image/upload/v1693719376/posts/tomjj3ob1wyaeiox5qoh.jpg"
                    />
                    <p className="font-bold text-[20px] text-[#E0E0E0] pl-3">
                      @Gbariel_Oque
                    </p>
                  </div>
                  <div className="flex items-center pr-3">
                    <FollowBoton title={title} />
                  </div>
                </div>
                <div>
                  <div className="text-[#E0E0E0] font-bold text-[30px] pl-3 pt-3 p-4">
                    Comentarios
                  </div>
                  <div className="min-w-full overflow-auto comments-list scrollable-div lg:h-[550px]">
                    {usuarios.map((item, index) => (
                      <div key={index}>
                        <CommentCard
                          user={item.user}
                          comment={item.comment}
                          img={item.img}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex pt-8 mx-3">
                  <i className="pt-2 pr-3 text-2xl text-white fa-solid fa-heart"></i>
                  <InputGroup className="mb-5">
                    <InputRightElement pointerEvents="none">
                      <i className="text-[#ffffff] text-2xl fa-solid fa-paper-plane pt-1"></i>
                    </InputRightElement>
                    <Input
                      textColor={"#ffffff"}
                      type="text"
                      placeholder="Comentar"
                      height={"50px"}
                    />
                  </InputGroup>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
