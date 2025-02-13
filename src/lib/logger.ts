type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogMessage {
  message: string;
  level: LogLevel;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: Error;
}

class Logger {
  private static instance: Logger;
  private isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(logMessage: LogMessage): string {
    const { message, level, timestamp, context, error } = logMessage;
    const contextString = context ? ` | context: ${JSON.stringify(context)}` : '';
    const errorString = error ? ` | error: ${error.message} | stack: ${error.stack}` : '';
    
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextString}${errorString}`;
  }

  private log(logMessage: LogMessage): void {
    const formattedMessage = this.formatMessage(logMessage);

    switch (logMessage.level) {
      case 'error':
        console.error(formattedMessage);
        // Here you could add error reporting service integration (e.g., Sentry)
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'info':
        console.info(formattedMessage);
        break;
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedMessage);
        }
        break;
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log({
      message,
      level: 'info',
      timestamp: new Date().toISOString(),
      context,
    });
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log({
      message,
      level: 'warn',
      timestamp: new Date().toISOString(),
      context,
    });
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log({
      message,
      level: 'error',
      timestamp: new Date().toISOString(),
      context,
      error,
    });
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log({
      message,
      level: 'debug',
      timestamp: new Date().toISOString(),
      context,
    });
  }
}

export const logger = Logger.getInstance(); 