import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

import { AuthService } from "./auth.service";
import { LoginResponse } from "./dto/login-response.dto";
import { LoginInput } from "./dto/login.input";
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver()
@UseGuards(LocalAuthGuard)
export class AuthResolver {
  constructor(private authService: AuthService) { }
  @Mutation(() => LoginResponse)
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context
  ) {
    return this.authService.login(context.user)
  }
}
