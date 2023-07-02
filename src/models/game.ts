import { GameType } from 'src/types/game.type';
import { Gender } from 'src/types/gender';
import { Level } from 'src/types/level';
import { User } from './user';
import { Image } from 'src/types/image';

export interface Game {
  id: string;
  gameType: GameType;
  schedule: Date;
  level: Level;
  gender: Gender;
  spotsLeft: number;
  location: string;
  avatar: Image;
  owner: User;
  players: Partial<User>[];
}
