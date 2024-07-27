import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user.id.decorators';
import { AuthService } from './auth.service';
import { Tokens } from './type/token.type';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

  @Post('register')
  async signUp(@Body() signUpDto: SignUpDto): Promise<Tokens> {
    return this.authservice.signUp(signUpDto);
  }

  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.authservice.signIn(signInDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async signOut(@GetCurrentUserId() userId: number): Promise<void> {
    return this.authservice.signOut(userId);    
  }
}
