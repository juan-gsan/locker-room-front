import { Gender } from 'src/types/gender';
import { Level } from 'src/types/level';
import { Image } from 'src/types/image';

export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  avatar: Image;
  gender: Gender;
  level: Level;
}
