import { User } from 'src/interfaces';

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
