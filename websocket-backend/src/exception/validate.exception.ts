import { HttpException, HttpStatus } from '@nestjs/common';

export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationException extends HttpException {
  constructor(message: string, errors: ValidationError[]) {
    super(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'バリデーションエラーです',
        errors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
