import { Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export class User extends Document implements IUser {
  id: string;
  email: string;
  password: string;
}
