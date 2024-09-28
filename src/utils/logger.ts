/* eslint-disable @typescript-eslint/no-explicit-any */

import colors from 'colors';
import dayjs from 'dayjs';
import { Request, Response } from 'express';

type Info = {
  namespace: 'error' | 'log' | 'info' | 'warn' | 'success' | 'request';
  message: string;
  date: string;
};

export default class Logger {
  static logs: Info[] = [];
  static errors: Info[] = [];
  static isLogging: boolean = true;
  private colorsMap = {
    error: 'red',
    success: 'green',
    info: 'cyan',
    log: 'yellow',
    warn: 'magenta',
    request: 'blue',
  };

  constructor() {
    Logger.logs = [];
    Logger.errors = [];
  }

  private static getCurrentTimestamp = () => dayjs().format('HH:mm:ss');

  // Method to start logging interval
  public startLoggingInterval = (logging: boolean = true) => {
    Logger.isLogging = logging;
    if (!logging) return;
    let previousLogsLength = 0;
    let previousErrorsLength = 0;
    setInterval(() => {
      const transformedFLogs = this.transform(Logger.logs);
      const transformedFErrors = this.transform(Logger.errors);
      const { length: logsLength } = Object.keys(transformedFLogs);
      const { length: errorsLength } = Object.keys(transformedFErrors);
      let printTables = false;
      const logsChanged = previousLogsLength != logsLength;
      const errorsChanged = previousErrorsLength != errorsLength;
      if (logsChanged || errorsChanged) {
        console.clear();
        printTables = true;
      }
      if (logsChanged) previousLogsLength = logsLength;
      if (errorsChanged) previousErrorsLength = errorsLength;
      if (printTables) {
        if (logsLength > 0) console.table(transformedFLogs);
        if (errorsLength > 0) console.table(transformedFErrors);
      }
    }, 1000);
  };

  private transform = (array: Info[]) => {
    if (array.length === 0) return [];

    const transformed = array.reduce(
      (acc: { [key: string]: Info }, { namespace, message, date }, index) => {
        const color = (this.colorsMap[namespace as keyof typeof this.colorsMap] || 'red') as 'red';
        acc[index + 1] = {
          date: colors.yellow(date),
          namespace: colors[color](namespace.toUpperCase()) as Info['namespace'],
          message: colors.white(message),
        };
        return acc;
      },
      {} as { [key: string]: Info },
    );

    return transformed;
  };

  private static createLog = (log: any[], namespace: Info['namespace']): Info => {
    return {
      date: this.getCurrentTimestamp(),
      namespace: namespace || 'info',
      message: log.map((item) => (typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item))).join(' '),
    };
  };

  static log(...log: any[]) {
    if (!this.isLogging) return console.log(...log);
    this.logs.push(this.createLog(log, 'log'));
  }

  static error(...log: any[]) {
    if (!this.isLogging) return console.log(...log);
    this.errors.push(this.createLog(log, 'error'));
  }

  static success(...log: any[]) {
    if (!this.isLogging) return console.log(...log);
    this.logs.push(this.createLog(log, 'success'));
  }

  static info(...log: any[]) {
    if (!this.isLogging) return console.log(...log);
    this.logs.push(this.createLog(log, 'info'));
  }

  static warn(...log: any[]) {
    if (!this.isLogging) return console.log(...log);
    this.logs.push(this.createLog(log, 'warn'));
  }

  static logRequest = (req: Request, res: Response) => {
    const log = `${colors.green(String(res.statusCode))}, ${colors.green(req.method)}, ${colors.white(req.url)}`;
    if (!this.isLogging) return console.log(log);
    this.logs.push(this.createLog([log], 'request'));
  };

  static errorRequest = (req: Request, res: Response) => {
    const log = `${colors.red(String(res.statusCode))}, ${colors.red(req.method)}, ${colors.white(req.url)}`;
    if (!this.isLogging) return console.log(log);
    this.errors.push(this.createLog([log], 'error'));
  };
}
