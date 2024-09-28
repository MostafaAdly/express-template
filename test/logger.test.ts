import colors from 'colors';
import dayjs from 'dayjs';

type Log = {
  namespace: 'default' | 'error' | 'test';
  message: string;
  date: string;
};

const logs: Log[] = [];

const getCurrentDate = () => dayjs().format('hh:mm:ss');

const log = (log: Omit<Log, 'date'>) => {
  logs.push({ ...log, date: getCurrentDate() });
};

setInterval(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformed = logs.reduce((acc: any, { namespace, message, date }, index) => {
    acc[index + 1] = {
      date: colors.yellow(date),
      namespace: namespace === 'error' ? colors.red(message) : colors.cyan(namespace),
      message: colors.green(message),
    };
    return acc;
  }, {});

  console.clear();
  console.log('--------------[ Logs ]--------------');
  console.table(transformed);
}, 50);

log({ message: 'Hello', namespace: 'test' });
setInterval(() => {
  log({ message: Math.random() + '', namespace: Math.random() < 0.5 ? 'error' : 'test' });
}, 5000);
