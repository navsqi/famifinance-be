// decorators/user-info.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user; // assuming user is set in req.user by middleware or guard
});
