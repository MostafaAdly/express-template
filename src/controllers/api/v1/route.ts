import Handler from 'managers/controllers/handler';

export default class Route extends Handler {
  public get = () => {
    this.sendResponse({
      message: 'Hello World GET',
      status: 200,
    });
  };
}
