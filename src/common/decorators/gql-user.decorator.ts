import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/models/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req && ctx.req.user;
  },
);
