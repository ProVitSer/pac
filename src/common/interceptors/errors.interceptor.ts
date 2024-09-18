import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatabaseException } from '../exceptions/database.exception';
import { every, partial, has, includes } from 'lodash';
import { RpcException } from '../exceptions/rpc.exeption';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            catchError((err: any) => {
                const error = every(['table', 'query'], partial(has, err))
                    ? new DatabaseException(err)
                    : includes(err?.details, 'RpcException')
                      ? new RpcException(err)
                      : err instanceof HttpException
                        ? err
                        : new HttpException((err?.message as Error) || 'Unknown error', HttpStatus.BAD_REQUEST, { cause: <Error>err });

                return throwError(() => error);
            }),
        );
    }
}
