import { UserComment } from ".";
export interface CommentState {
  comments: UserComment[];
  isLoadingComments: boolean;
  error?: string | null;
}
