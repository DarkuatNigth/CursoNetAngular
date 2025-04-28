import { User } from '@app/models/backend/user';

export { User as UserResponse} from '@app/models/backend/user';

export interface EmailPasswordCredentials{
  strEmail: string;
  strPassword: string;
}


export interface UserRequest extends User{
  strPassword: string;
}

export type UserCreateRequest = Omit<UserRequest, 'strToken'>;
