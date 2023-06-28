import { GameType } from 'src/types/game.type';
import { Image } from 'src/types/image';

export interface SportsField {
  id: string;
  name: string;
  gameType: GameType;
  location: string;
  picture: Image;
}
