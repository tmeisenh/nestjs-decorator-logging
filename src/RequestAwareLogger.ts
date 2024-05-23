import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

/**
 * This is an example of a service/dependency that is "request aware"
 */
@Injectable({ scope: Scope.REQUEST })
export class RequestAwareLogger {
  constructor(
    private readonly logger: Logger,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private buildLogMessage(
    level: string,
    message: string,
    data?: unknown,
    origin?: string,
  ): string {
    return JSON.stringify({
      level,
      origin,
      message,
      data,
      url: this.request.url,
      method: this.request.method,
    });
  }

  debug(origin: string, message: string, data?: unknown) {
    this.logger.debug(
      this.buildLogMessage('debug', message, data, origin),
      origin,
    );
  }

  log(origin: string, message: string, data?: unknown) {
    this.logger.log(this.buildLogMessage('log', message, data, origin), origin);
  }

  error(origin: string, message: string, data?: unknown) {
    const trace = '';
    this.logger.error(
      this.buildLogMessage('error', message, data, origin),
      trace,
      origin,
    );
  }

  warn(message: string, data?: unknown, origin?: string) {
    this.logger.warn(
      this.buildLogMessage('warn', message, data, origin),
      origin,
    );
  }

  trace(origin: string, message: string, data?: unknown) {
    this.logger.verbose(
      this.buildLogMessage('verbose', message, data, origin),
      origin,
    );
  }
}
