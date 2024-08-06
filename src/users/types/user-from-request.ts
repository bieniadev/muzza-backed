import { User } from './../models/user.model';
export type UserFromRequest = Pick<User, '_id' | 'email' | 'username'>;
