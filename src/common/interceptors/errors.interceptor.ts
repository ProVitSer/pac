import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
    Inject,
    LoggerService,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatabaseException } from '../exceptions/database.exception';
import { every, partial, has, includes } from 'lodash';
import { RpcException } from '../exceptions/rpc.exeption';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            catchError((err: any) => {
                this.logger.error(err);

                const error = every(['table', 'query'], partial(has, err))
                    ? new DatabaseException(err)
                    : includes(err?.details, 'RpcException')
                      ? new RpcException(err)
                      : err instanceof HttpException
                        ? err
                        : (err?.message as Error)
                          ? err
                          : new HttpException((err?.message as Error) || 'Unknown error', HttpStatus.BAD_REQUEST, { cause: <Error>err });

                return throwError(() => error);
            }),
        );
    }
}
