import { User } from 'src/models/user';

export type Token = {
  token: string;
  user: Partial<User>;
};
