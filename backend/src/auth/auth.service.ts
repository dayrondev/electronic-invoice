import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { hash, verify } from 'argon2';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) throw new ConflictException('User already exists!');

    return this.userService.create(createUserDto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');

    const isPasswordMatched = await verify(user.password, password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid Credentials!');

    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  async login(user: User) {
    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateHashedRefreshToken(
      user.id,
      hashedRefreshToken,
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found!');

    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return currentUser;
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found!');

    if (!user.hashedRefreshToken) {
      throw new UnauthorizedException('User refresh token not found!');
    }

    const refreshTokenMatched = await verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatched)
      throw new UnauthorizedException('Invalid Refresh Token!');

    const currentUser = { id: user.id };
    return currentUser;
  }

  async refreshToken(user: User) {
    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateHashedRefreshToken(
      user.id,
      hashedRefreshToken,
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;
    return await this.userService.create(googleUser);
  }

  async signOut(userId: string) {
    return await this.userService.updateHashedRefreshToken(userId, null);
  }
}
