import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { User } from '@prisma/client';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';
import { FRONTEND_URL } from './config/constants';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { RequestWithUser } from './types/request-with-user.interface';

// @UseGuards(RolesGuard)
// @UseGuards(JwtAuthGuard)
// At this point the guards are executed from bottom to top, first JwtAuthGuard and then RolesGuard

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  // @SetMetadata('IS_PUBLIC', true)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @Roles('ADMIN') // 'ADMIN', 'EDITOR', ...
  @Get('protected')
  getAll(@Request() req: RequestWithUser) {
    return {
      message: `Now you can access this protected API. This is your user ID ${req.user.id}`,
    };
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req: RequestWithUser) {
    return this.authService.refreshToken(req.user);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req: { user: User }, @Res() res: Response) {
    const resopnse = await this.authService.login(req.user);
    res.redirect(
      `${FRONTEND_URL}/api/auth/google/callback?userId=${resopnse.id}&name=${resopnse.name}&email=${resopnse.email}&hasBusiness=${resopnse.hasBusiness}&role=${resopnse.role}&accessToken=${resopnse.accessToken}&refreshToken=${resopnse.refreshToken}`,
    );
  }

  @Post('signout')
  signOut(@Req() req: Request & { user: { id: string } }) {
    return this.authService.signOut(req.user.id);
  }
}
