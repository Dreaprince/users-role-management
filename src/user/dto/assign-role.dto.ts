import { IsNotEmpty, IsInt } from 'class-validator';

export class AssignRoleDto {
  @IsNotEmpty({ message: 'User ID is required' })
  @IsInt({ message: 'User ID must be an integer' })
  readonly userId: number;

  @IsNotEmpty({ message: 'Role ID is required' })
  @IsInt({ message: 'Role ID must be an integer' })
  readonly roleId: number;
}
