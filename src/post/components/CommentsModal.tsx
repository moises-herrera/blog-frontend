import { FollowButton, FormControlContainer } from "src/shared/components";
import { Comment, ModalData, PostInfo, User } from "src/interfaces";
import { getDateFormattedFromString, postHasLike } from "src/helpers";
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
import { CommentCard, LikeButton } from ".";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";

interface CommentsModalProps extends ModalData {
  currentUserId: string;
  infoPost: PostInfo;
}

type CommentForm = {
  comment: string;
};

export const CommentsModal = ({
  isOpen,
  onClose,
  currentUserId,
  infoPost: { _id, title, topic, image, description, user, createdAt, likes },
}: CommentsModalProps) => {
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const { comments } = useTypedSelector(({ comment }) => comment);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentForm>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<CommentForm> = ({ comment }) => {
    const commentData: Partial<Comment> = {
      content: comment,
      user: currentUserId,
      post: _id,
    };
    dispatch(createComment(commentData));

    reset();
  };

  useEffect(() => {
    dispatch(getComments(_id));
  }, []);

  return (
    <Modal
      size={"6xl"}
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent background="primary.500" borderRadius={20}>
        <ModalBody margin={"0px"} padding={"0px"}>
          <div className="flex flex-col w-full h-full sm:flex-row">
            <div className="hidden w-full bg-white rounded-l-[20px] lg:w-1/2 lg:block">
              <CloseButton onClick={onClose} />
              {image && (
                <div className="flex justify-center">
                  <Image
                    rounded={"20px"}
                    boxSize="450px"
                    objectFit="cover"
                    src={image}
                    alt={title}
                  />
                </div>
              )}
              <div className="mt-3 flex justify-evenly text-secondary-300">
                <p>#{topic}</p>
                <p>{getDateFormattedFromString(createdAt)}</p>
              </div>
              <div className="flex justify-center text-primary-500 text-[22px] pt-2 pb-3 font-semibold">
                <h2>{title}</h2>
              </div>
              <p className="text-[16px] text-primary-500 px-5 pb-3">
                {description}
              </p>
            </div>
            <div className="w-full bg-primary-500 rounded-r-[20px] lg:w-1/2 h-full">
              <div className="block lg:hidden">
                <CloseButton
                  className="text-secondary-100 pl-3 text-xl pb-3"
                  onClick={onClose}
                />
              </div>
              <div className="flex justify-between mt-5">
                <div className="flex items-center">
                  <Avatar
                    marginLeft={"10px"}
                    marginRight={"5px"}
                    size="lg"
                    src={user?.avatar || avatarPlaceholder}
                  />
                  <p className="font-bold text-[20px] text-secondary-100 pl-3">
                    @{user?.username}
                  </p>
                </div>
                <div className="flex items-center pr-3">
                  <FollowButton user={user} currentUser={currentUser as User} />
                </div>
              </div>
              <div>
                <div className="text-secondary-100 font-bold text-[30px] pl-3 pt-3 p-4">
                  Comentarios
                </div>

                <div className="min-w-full overflow-auto comments-list scrollable-div lg:h-[550px]">
                  {comments.map(
                    ({
                      _id: commentId,
                      content,
                      user: { _id: commentAuthorId, username, avatar },
                    }) => (
                      <CommentCard
                        key={commentId}
                        commentId={commentId}
                        username={username}
                        avatar={avatar}
                        content={content}
                        postId={_id}
                        postAuthorId={user._id}
                        commentAuthorId={commentAuthorId}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="flex pt-8 mx-3">
                <div className="pt-2 pr-3 text-2xl">
                  <LikeButton
                    postId={_id}
                    userId={currentUser?._id as string}
                    userLiked={postHasLike(likes, currentUser?._id as string)}
                    iconDefaultColor="text-white"
                  />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  <InputGroup className="mb-5">
                    <InputRightElement>
                      <Button
                        marginTop={"10px"}
                        background="transparent"
                        _hover={{ background: "transparent" }}
                        type="submit"
                      >
                        <i className="text-white text-2xl fa-solid fa-paper-plane"></i>
                      </Button>
                    </InputRightElement>
                    <div className="flex flex-col w-full">
                      <FormControlContainer fieldError={errors.comment}>
                        <Input
                          autoComplete="off"
                          defaultValue={""}
                          textColor="white"
                          type="text"
                          placeholder="Comentar"
                          height={"50px"}
                          {...register("comment", {
                            required: "El comentario es requerido",
                          })}
                        />
                      </FormControlContainer>
                    </div>
                  </InputGroup>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
