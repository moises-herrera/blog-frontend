import { StandardResponse } from ".";

/**
 * Error response data.
 */
export interface ErrorResponse extends StandardResponse {
  message: string;
}
