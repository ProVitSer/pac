import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            catchError((err: object) => {
                const error = new HttpException((<Error>err)?.message || 'Unknown error', HttpStatus.BAD_REQUEST, { cause: <Error>err });
                return throwError(() => error);
            }),
        );
    }
}
