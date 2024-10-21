import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, passwordHash: rawPassword } = createUserDto;

    // Check if email already exists
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Create new user
    const newUser = await this.prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        passwordHash: hashedPassword,
      },
    });

    const { passwordHash, ...userResponse } = newUser;

    const accessToken = sign(
      {
        id: newUser.id,
        email: newUser.email,
        lastName: newUser.lastName,
        firstName: newUser.firstName,
        //roles: newUser.roles,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    return {
      statusCode: '00',
      message: 'Signup successful',
      data: {
        user: userResponse,
        accessToken,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;

    // Find user by email and validate password
    const user = await this.prisma.user.findUnique({
      where: { email: username },
      include: { roles: true } // Include roles in the user object
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new BadRequestException('Invalid credentials');
    }

    // Exclude passwordHash from user response
    const { passwordHash, ...userResponse } = user; 

    // Generate JWT token
    const accessToken = sign(
      {
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        roles: user.roles || [],
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return {
      statusCode: '00',
      message: 'Login Successful',
      data: {
        user: userResponse,
        accessToken,
      },
    };
  }


}
