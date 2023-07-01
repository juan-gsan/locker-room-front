import { GameType } from 'src/types/game.type';
import { Gender } from 'src/types/gender';
import { Level } from 'src/types/level';
import { SportsField } from './sports.field';
import { User } from './user';

export interface Game {
  id: string;
  gameType: GameType;
  schedule: Date;
  level: Level;
  gender: Gender;
  spotsLeft: number;
  location: SportsField;
  owner: User;
  players: Partial<User>[];
}
