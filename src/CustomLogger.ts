import { ConsoleLogger, LogLevel } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {
  protected printMessages(
    messages: unknown[],
    context?: string,
    logLevel?: LogLevel,
    writeStreamType?: 'stdout' | 'stderr',
  ): void {
    messages.forEach((message) => {
      const output = `${this.context} - ${JSON.stringify(message)}`;
      const computedMessage = `${output}\n`;
      process[writeStreamType ?? 'stdout'].write(computedMessage);
    });
  }
}
