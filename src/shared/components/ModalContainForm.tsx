import { Modal, ModalContent, ModalBody, Image } from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ModalContainForm = ({
  isOpen,
  onClose,
  title,
  children,
}: Props) => {
  return (
    <Modal
      size={"full"}
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalContent background={"#2F2F2F"}>
        <ModalBody margin={"0px"} padding={"0px"}>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="hidden w-full h-screen bg-white lg:w-1/2 lg:block style-contain-comments">
              <Image
                boxSize="100%"
                objectFit="cover"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />
            </div>
            <div className="flex flex-col justify-center w-full h-screen lg:w-1/2">
              <div className="my-10 text-center">
                <h2 className="text-5xl font-bold text-[#FF5050]">Blog.</h2>
              </div>
              <div className="text-center text-[20px] lg:text-[30px] font-extrabold text-[#E0E0E0] mb-10 px-0 lg:px-52">
                <p>{title}</p>
              </div>
              {children}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
