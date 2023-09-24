import { User } from ".";

export interface UserWithAvatarFile extends Partial<User> {
  /** Avatar file. */
  avatarFile: File | null;
}

/**
 * Update user data.
 */
export interface UpdateUser {
  /** User id. */
  id: string;

  /** User data. */
  userData: UserWithAvatarFile;
}
