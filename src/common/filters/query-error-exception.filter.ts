import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryErrorExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // TODO: improve exception message
    if (exception.code && exception.code === '23505') {
      const status = HttpStatus.CONFLICT;
      const error = 'Conflict';

      let message: string;
      if (
        exception.detail &&
        typeof exception.detail === 'string' &&
        exception.detail.includes('already exists')
      ) {
        let field = (exception.detail as string)
          .replace(/[\(\)]+/g, '')
          .split(' ')[1];
        field =
          field.split('=')[0].charAt(0).toUpperCase() +
          field.split('=')[0].slice(1);
        message = `${field} already exists`;
      } else message = 'Already exists';

      response.status(status).json({ status, message, error });
    } else super.catch(exception, host);
  }
}
