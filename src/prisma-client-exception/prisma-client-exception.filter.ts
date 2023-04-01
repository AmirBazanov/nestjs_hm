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
import { TEXT_NOT_FOUND } from '../constants/text-block.constants';

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
    switch (exception) {
      case exception.code == 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          error: USER_NOT_FOUND,
        });
        break;
      default:
        response.status(status).json({
          statusCode: status,
          error: message,
        });
    }
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
    switch (exception) {
      case exception.code == 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          error: ROLE_NOT_FOUND,
        });
        break;
      default:
        response.status(status).json({
          statusCode: status,
          error: message,
        });
    }
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
    switch (exception) {
      case exception.code == 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          error: PROFILE_NOT_FOUND,
        });
        break;
      default:
        response.status(status).json({
          statusCode: status,
          error: message,
        });
    }
  }
}

@Catch()
export class PrismaTextBlockExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.NOT_FOUND;
    const message = exception.message;
    switch (exception.code) {
      case 'P2025':
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          error: TEXT_NOT_FOUND,
        });
        break;
      default:
        response.status(status).json({
          statusCode: status,
          error: message.meta ? message.meta : message,
        });
    }
  }
}
