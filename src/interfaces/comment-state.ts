import { CommentInfo } from ".";
export interface CommentState {
  comments: CommentInfo[];
  isLoadingComments: boolean;
  error?: string | null;
  successMessage?: string | null;
}
