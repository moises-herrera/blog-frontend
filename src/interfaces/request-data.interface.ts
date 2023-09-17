import { QueryParams } from ".";

/**
 * The basic information to make a request.
 */
export interface RequestData {
  /** The current record id. */
  id: string;

  /** The query params. */
  queryParams: QueryParams;
}
