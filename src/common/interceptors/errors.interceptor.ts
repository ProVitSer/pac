import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatabaseException } from '../exceptions/database.exception';
import { every, partial, has } from 'lodash';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            catchError((err: any) => {
                console.log(err);
                const error = every(['table'], partial(has, err))
                    ? new DatabaseException(err)
                    : new HttpException((err?.message as Error) || 'Unknown error', HttpStatus.BAD_REQUEST, { cause: <Error>err });

                return throwError(() => error);
            }),
        );
    }
}
