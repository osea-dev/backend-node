import { BaseError, IBaseErrorConstructorArgs } from './base.error.js';

export class DatabaseError extends BaseError {
  constructor(args: Omit<IBaseErrorConstructorArgs, 'errorCodename'>) {
    super({
      ...args,
      errorCodename: 'DATABASE_ERROR',
    });
  }
}
