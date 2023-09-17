export interface Message {
  content: {
    text: string;
  };
  sender: string;
  deliveredAt: Date;
  readAt: Date;
}
