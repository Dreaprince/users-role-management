import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';


export class Role {
  @Expose()
  id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsArray()
  @IsNotEmpty({ message: 'Permissions cannot be empty' })
  permissions: string[];

  users?: User[]; // Optional, can be included for eager loading if necessary
}
