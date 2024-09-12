import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { signInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() param: signInDto) {
    return this.authService.signIn(param.email, param.password);
  }
}
