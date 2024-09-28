/* eslint-disable @typescript-eslint/no-explicit-any */
type User = {
  username: string;
  password: string;
};

type RequestType = {
  body: any;
  headers: string[];
  footers: string[];
};

const request: RequestType = {
  body: {} as any,
  headers: [],
  footers: [],
};

const getRequest = <T>(): Omit<RequestType, 'body'> & { body: T } => {
  return request as Omit<RequestType, 'body'> & { body: T };
};

const user = getRequest<User>();
console.log(user.body.username);
