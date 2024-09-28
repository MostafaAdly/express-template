import Handler from 'managers/controllers/handler';

export default class Route extends Handler {
  public aliases = ['/test', '/up'];

  public get = () => {
    return this.sendResponse({
      message: `Server is running smoothly with uptime of ${this.formatUptime(process.uptime())}`,
      status: 200,
    });
  };

  private formatUptime = (uptime: number) => {
    const days = Math.floor(uptime / (24 * 60 * 60));
    const hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
}
