/**
 * Whether the post has a like from the user.
 *
 * @param likes The post likes.
 * @param userId The user id.
 * @returns Whether the post has a like from the user.
 */
export const postHasLike = (likes: string[], userId: string): boolean => {
  return likes.includes(userId);
};
