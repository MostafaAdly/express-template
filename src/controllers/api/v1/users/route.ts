import Handler from 'managers/controllers/handler';
import UsersService from 'services/users.service';

export default class Route extends Handler {
  public middlewares = ['auth'];

  public get = async () => {
    const users = await UsersService.getUsers();
    return this.sendResponse({
      data: users,
      message: 'Users fetched successfully',
      status: 200,
    });
  };
}
