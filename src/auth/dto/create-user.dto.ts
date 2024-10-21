import { IsNotEmpty, IsEmail, Length, Matches, IsString, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name is required' })
  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  readonly firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
  readonly lastName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(5, 20, { message: 'Password must be between 6 and 10 characters' })
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/, {
  //   message: 'Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character',
  // })
  readonly passwordHash: string;

}


