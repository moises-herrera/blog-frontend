import { User } from "src/interfaces";

/**
 * Get user full name.
 *
 * @param user The user data.
 * @returns The full name.
 */
export const getFullName = (user: User): string => {
  const fullName = `${user.firstName} ${user.lastName}`;
  return fullName;
};

/**
 * Whether the user has a follower.
 *
 * @param user The user data.
 * @param followerId The follower id.
 * @returns Whether the user has a follower.
 */
export const hasFollower = (user: User, followerId: string): boolean => {
  return user.followers.includes(followerId);
};
