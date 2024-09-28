import Handler from 'managers/controllers/handler';
import AuthService from 'services/auth.service';

import { SchemaType } from './post.dto';

export default class Route extends Handler {
  public post = async () => {
    const { body } = this.getRequest<SchemaType>();
    const user = await AuthService.register(body);
    this.sendResponse({
      data: user,
      message: 'User registered successfully',
      status: 200,
    });
  };
}
