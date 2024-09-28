/* eslint-disable @typescript-eslint/no-explicit-any */
// require('@babel/register')({
//   extensions: ['.ts', '.js'],
//   presets: ['@babel/preset-typescript'],
// });

import readline from 'readline';
import repl from 'repl';
import vm from 'vm';
import * as babel from '@babel/core';

import Database from '../src/database/database';
import { User } from '../src/database/entities/user.entity';
import UserService from '../src/services/users.service';

(async () => {
  await new Database().start();
  const self = repl.start({
    prompt: '| Tawreed » ',
    eval: async (cmd: string, context: any, filename: string, callback: (err: Error | null, result?: any) => void) => {
      try {
        if (cmd.trim() === 'exit') process.exit(0);

        const { code } = babel.transform(cmd, {
          presets: ['@babel/preset-typescript'],
          filename: 'repl.ts',
        });

        const script = new vm.Script(code);
        const result = await script.runInContext(context);

        callback(null, result);
      } catch (err) {
        callback(err as Error);
      }
    },
  });

  self.context.User = User;
  self.context.UserService = UserService;

  self.context.shared = {};

  if (process.stdin.isTTY) {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    self.on('exit', () => {
      process.stdin.setRawMode(false);
    });
  }
})();
