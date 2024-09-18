import { UnauthenticatedError } from "@/errors/index.js";
import { IContext } from "@/shared/interfaces/index.js";

export const checkAuthentication =  async (ctx: IContext): Promise<IContext> => {
    if(!ctx.userId) {
        throw new UnauthenticatedError()
    }

    return ctx as never
}