import { CommentCard, FollowButton } from "src/shared/components";
import { PostInfo } from "src/interfaces";
import { hasFollower, getDateFormattedFromString } from "src/helpers";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppDispatch } from "src/store/types";
import { createComment, getComments } from "src/store/comment";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/store";
import { useEffect } from "react";

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
  Button,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  infoPost: PostInfo;
}
type InputForm = {
  comment: string;
};

export const CommentsModal = ({
  isOpen,
  onClose,
  currentUserId,
  infoPost: {
    _id,
    title,
    topic,
    image,
    description,
    user,
    //comments,
    //likes,
    createdAt,
  },
}: Props) => {
  const { comments } = useTypedSelector(({ comment }) => comment);

  const {
    reset,
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<InputForm>();
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit: SubmitHandler<InputForm> = (data) => {
    const datacomment = {
      content: data.comment,
      user: currentUserId,
      post: _id,
    };
    dispatch(createComment(datacomment));

    reset();
  };

  useEffect(() => {
    dispatch(getComments(_id));
  }, []);
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
                    src={image}
                    alt="Dan Abramov"
                  />
                </div>
                <div className="flex justify-evenly text-[#7B7B7B]">
                  <p>#{topic}</p>
                  <p>{getDateFormattedFromString(createdAt)}</p>
                </div>
                <div className="flex justify-center text-[#2F2F2F] text-[22px] pt-2 pb-3">
                  <h2>{title}</h2>
                </div>
                <div className="text-[16px] text-[#2F2F2F] felx justify-center px-5 pb-3">
                  <article>{description}</article>
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
                      src={user?.avatar}
                    />
                    <p className="font-bold text-[20px] text-[#E0E0E0] pl-3">
                      @{user?.username}
                    </p>
                  </div>
                  <div className="flex items-center pr-3">
                    <FollowButton
                      userId={user._id}
                      hasFollower={hasFollower(user, currentUserId as string)}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-[#E0E0E0] font-bold text-[30px] pl-3 pt-3 p-4">
                    Comentarios
                  </div>

                  <div className="min-w-full overflow-auto comments-list scrollable-div lg:h-[550px]">
                    {comments.map((comment) => (
                      <div key={comment._id}>
                        <CommentCard
                          user={comment.user.username}
                          comment={comment.content}
                          img={comment.user.avatar}
                          userId={user._id}
                          commentId={comment.user._id}
                          commenkey={comment._id}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex pt-8 mx-3">
                  <i className="pt-2 pr-3 text-2xl text-white fa-solid fa-heart"></i>
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <InputGroup className="mb-5">
                      <InputRightElement>
                        <Button
                          marginTop={"10px"}
                          background={"none"}
                          type="submit"
                        >
                          <i className="text-[#ffffff] text-2xl fa-solid fa-paper-plane"></i>
                        </Button>
                      </InputRightElement>
                      <div className="flex flex-col w-full">
                        <Input
                          defaultValue={""}
                          textColor={"#ffffff"}
                          type="text"
                          placeholder="Comentar"
                          height={"50px"}
                          {...register("comment", { required: true })}
                        />
                        {errors.comment && (
                          <span className="text-white">
                            El comentario es requerido
                          </span>
                        )}
                      </div>
                    </InputGroup>
                  </form>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
