import { QueryParams } from ".";

/**
 * Get likes list.
 */
export interface GetLikes {
  /** Post id. */
  id: string;

  /** Query params. */
  queryParams: QueryParams;
}
