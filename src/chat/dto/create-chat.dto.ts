export class CreateChatDto {
  name?: string;
  isGroup?: boolean;
  userIds: number[];
}
