import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { ROLE_NOT_FOUND } from '../constants/roles.constants';
import { PROFILE_NOT_FOUND } from '../constants/profile.constants';
import { USER_NOT_FOUND } from '../constants/user.constants';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const user_message = message.match(
          /(Unique constraint failed on the fields:).*\)/g,
        );
        response.status(status).json({
          statusCode: status,
          error: user_message ? user_message : message,
        });
        break;
      }
    }
  }
}

@Catch()
export class PrismaUserExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;
    if (exception.meta) {
      response.status(404).json({
        statusCode: 404,
        error: USER_NOT_FOUND,
      });
      return;
    }
    response.status(status).json({
      statusCode: status,
      error: message,
    });
  }
}

@Catch()
export class PrismaRoleExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;
    if (exception.meta) {
      response.status(404).json({
        statusCode: 404,
        error: ROLE_NOT_FOUND,
      });
      return;
    }
    response.status(status).json({
      statusCode: status,
      error: message,
    });
  }
}

@Catch()
export class PrismaProfileExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;
    if (exception.meta) {
      response.status(404).json({
        statusCode: 404,
        error: PROFILE_NOT_FOUND,
      });
      return;
    }
    response.status(status).json({
      statusCode: status,
      error: message,
    });
  }
}
