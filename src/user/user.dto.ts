import { IsNotEmpty } from 'class-validator';
import { IdeaEntity } from 'src/idea/idea.entity';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: string;
  username: string;
  created: Date;
  token?: string;
  bookmarks?: IdeaEntity[];
}
