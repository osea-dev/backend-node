import type { IContext } from '@/shared/interfaces';

declare global {
  namespace Express {
    export interface Request {
      context: IContext;
    }
  }
}