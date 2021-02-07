import { Logger as NestLogger } from '@nestjs/common';

const enum LoggerConfig {
  debug,
  info,
  warn,
  error,
}

const CONFIG = 0;

class Logger {
  private readonly logger: NestLogger;
  constructor(context: string) {
    this.logger = new NestLogger(context);
  }

  start(methodName: string, ...args: any[]) {
    if (LoggerConfig.debug >= CONFIG) {
      this.logger.debug(
        `[${methodName}]:CallMethod__Start ${args.map(
          (arg, index) => `arg[${index}]: ${arg}, `,
        )}`,
      );
    }
  }

  end(methodName: string, returnObject?: any) {
    if (LoggerConfig.debug >= CONFIG) {
      this.logger.debug(
        `[${methodName}]: CallMethod__End return: ${returnObject}`,
      );
    }
  }

  debug(methodName: string, message: string) {
    if (LoggerConfig.debug >= CONFIG) {
      this.logger.debug(`[${methodName}]: ${message}`);
    }
  }

  log(methodName: string, message: string) {
    if (LoggerConfig.info >= CONFIG) {
      this.logger.log(`[${methodName}]: ${message}`);
    }
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
