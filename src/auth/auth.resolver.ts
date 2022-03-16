import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { LoginInput } from './dto/login.input';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse)
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context
  ) {
    return this.authService.login(context.user)
  }
}
