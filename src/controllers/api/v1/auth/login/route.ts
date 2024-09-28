import Handler from 'managers/controllers/handler';
import AuthService from 'services/auth.service';

import { SchemaType } from './post.dto';

export default class Route extends Handler {
  public post = async () => {
    const { body } = this.getRequest<SchemaType>();

    const { user, token } = await AuthService.login(body);

    this.sendResponse({
      data: { token, user },
      message: 'Login successful',
    });
  };
}
