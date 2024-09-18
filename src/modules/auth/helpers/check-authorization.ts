import { UnauthorizedError } from "@/errors/index.js";
import { IContext } from "@/shared/interfaces/index.js";

export const checkAuthorization = async (ctx: IContext, requiredRoles: string []): Promise<IContext> => {
    const userRoles = ctx.roles || []
    const hasRequiredRoles = requiredRoles.some(role => userRoles.includes(role))
    if(!hasRequiredRoles) {
        throw new UnauthorizedError()
    }
    return ctx as never
}