import { Game } from 'src/models/game';

export type ApiResponse = {
  count: number;
  page: number;
  items: Game[];
};
