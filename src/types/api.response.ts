import { Game } from 'src/models/game';

export type ApiResponse = {
  items: Game[];
  count: number;
  next: string;
  prev: string;
};
