import {
  FollowButton,
  FormControlContainer,
  Loading,
  Username,
} from "src/shared/components";
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
  Textarea,
} from "@chakra-ui/react";
import { CommentCard, LikeButton } from ".";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";
import { Link } from "react-router-dom";

interface CommentsModalProps extends ModalData {
  infoPost: PostInfo;
}

type CommentForm = {
  comment: string;
};

export const CommentsModal = ({
  isOpen,
  onClose,
  infoPost: {
    _id,
    title,
    topic,
    files,
    description,
    user,
    createdAt,
    likes,
    isAnonymous,
  },
}: CommentsModalProps) => {
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const { comments, isLoadingComments } = useTypedSelector(
    ({ comment }) => comment
  );
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentForm>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<CommentForm> = ({ comment }) => {
    const commentData: Partial<Comment> = {
      content: comment,
      user: currentUser?._id as string,
      post: _id,
    };
    dispatch(createComment(commentData));

    reset();
  };

  useEffect(() => {
    dispatch(getComments(_id));
  }, []);

  const onCommentKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      const textValue = `${event.currentTarget.value}\n`;
      setValue("comment", textValue);
    }
  };

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
              <CloseButton onClick={onClose} className="ml-1" />
              {files && files.length > 0 && (
                <div className="flex justify-center m-auto">
                  {files[0].type.includes("image") ? (
                    <Image
                      src={files[0].url}
                      alt={title}
                      rounded="20px"
                      className="w-[450px]"
                    />
                  ) : (
                    <video src={files[0].url} controls className="w-[350px]" />
                  )}
                </div>
              )}
              <div className="mt-3 flex justify-evenly text-secondary-300">
                <p>#{topic}</p>
                <p>{getDateFormattedFromString(createdAt)}</p>
              </div>
              <div className="flex justify-center text-primary-500 text-[22px] pt-2 pb-3 font-semibold">
                <h2>{title}</h2>
              </div>
              <article
                className={`post-description ${
                  files?.length ? "max-h-[120px]" : "max-h-[80%]"
                }`}
              >
                <p className="text-[16px] text-primary-500 px-5 pb-3 text-justify">
                  {description}
                </p>
              </article>
            </div>
            <div className="w-full bg-primary-500 rounded-r-[20px] lg:w-1/2 h-full">
              <div className="block lg:hidden">
                <CloseButton
                  className="text-secondary-100 ml-3 mt-3 text-xl"
                  onClick={onClose}
                />
              </div>
              {!isAnonymous && (
                <div className="flex items-center justify-between mt-5 px-1">
                  <Link to={`/profile/${user.username}`} className="w-[70%]">
                    <div className="flex items-center">
                      <Avatar
                        marginLeft={"10px"}
                        marginRight={"5px"}
                        size="lg"
                        src={user.avatar || avatarPlaceholder}
                      />
                      <p className="font-bold text-[20px] text-secondary-100 pl-3 truncate">
                        <Username
                          username={user.username}
                          isFounder={user.isFounder}
                          isAccountVerified={user.isAccountVerified}
                        />
                      </p>
                    </div>
                  </Link>
                  <div className="pr-3">
                    <FollowButton
                      user={user}
                      currentUser={currentUser as User}
                    />
                  </div>
                </div>
              )}
              <div>
                <div className="text-secondary-100 font-bold text-[30px] pt-3 p-4">
                  Comentarios
                </div>

                <div className="min-w-full overflow-auto comments-list scrollable-div lg:h-[500px]">
                  {!isLoadingComments ? (
                    <>
                      {comments.map(
                        ({
                          _id: commentId,
                          content,
                          user: {
                            _id: commentAuthorId,
                            username,
                            avatar,
                            isFounder,
                            isAccountVerified,
                          },
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
                            isFounder={isFounder}
                            isAccountVerified={isAccountVerified}
                          />
                        )
                      )}
                    </>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>

              <div className="flex pt-8 mx-4">
                <div className="h-[84px] flex flex-col justify-center pr-3 text-2xl">
                  <LikeButton
                    postId={_id}
                    userId={currentUser?._id as string}
                    userLiked={postHasLike(likes, currentUser?._id as string)}
                    iconDefaultColor="text-white"
                  />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  <div className="flex mb-5">
                    <FormControlContainer fieldError={errors.comment}>
                      <Textarea
                        defaultValue={""}
                        textColor="white"
                        placeholder="Comentar"
                        rows={3}
                        resize="none"
                        {...register("comment", {
                          required: "El comentario es requerido",
                        })}
                        onKeyDown={onCommentKeyDown}
                      />
                    </FormControlContainer>

                    <div className="h-[84px] flex flex-col justify-center mx-3">
                      <button type="submit">
                        <i className="text-white text-2xl fa-solid fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
