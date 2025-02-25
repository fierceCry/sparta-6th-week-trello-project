// user role enum 정의 후 RolesGuard 정의

import { Injectable, CanActivate, ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { MemberRoles } from "src/common/custom/types/enum-member-roles"

export const Roles = (...roles: MemberRoles[]) => SetMetadata("roles", roles);

@Injectable()
export class RoleGuards implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<MemberRoles[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // UserRole.HOST가 포함된 경우에만 작동하도록 수정
    if (user.roles?.includes(MemberRoles.ONLY_VIEW)) {
      return false;
    }

    return roles.some((role) => user.roles?.includes(role));
  }
}
