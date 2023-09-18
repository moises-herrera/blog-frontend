import { QueryParams } from ".";

/**
 * The information to get followers.
 */
export interface GetFollowers {
  /** The current user id. */
  id: string;

  /** The query params. */
  queryParams: QueryParams;
}
