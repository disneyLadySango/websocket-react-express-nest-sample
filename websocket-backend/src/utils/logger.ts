import { Logger as NestLogger } from '@nestjs/common';

class Logger {
  private readonly logger: NestLogger;
  constructor(context: string) {
    this.logger = new NestLogger(context);
  }

  start(methodName: string, ...args: any[]) {
    this.logger.debug(
      `[${methodName}]:CallMethod__Start ${args.map(
        (arg, index) => `arg[${index}]: ${arg}, `,
      )}`,
    );
  }

  end(methodName: string, returnObject?: any) {
    this.logger.debug(
      `[${methodName}]: CallMethod__End return: ${returnObject}`,
    );
  }

  debug(methodName: string, message: string) {
    this.logger.debug(`[${methodName}]: ${message}`);
  }

  log(methodName: string, message: string) {
    this.logger.log(`[${methodName}]: ${message}`);
  }

  warn(methodName: string, message: string) {
    this.logger.warn(`[${methodName}]: ${message}`);
  }

  error(methodName: string, message: string, error: Error) {
    this.logger.error(`[${methodName}]: ${message}`);
    this.logger.error(`[${methodName}]: ${error.message}`);
    this.logger.error(`[${methodName}]: ${error}`);
  }
}

export default Logger;
