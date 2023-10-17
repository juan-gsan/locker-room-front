import { Game } from 'src/models/game';
import { SportsField } from 'src/types/sports.field';

export const mockUser = {
  id: 'user',
  userName: 'test',
  email: 'email@example.com',
  password: 'password',
  avatar: { url: '', urlOriginal: '', mimetype: '', size: 1 },
};

export const mockToken = { token: 'token', user: mockUser };

export const mockGame = {
  id: 'test',
  gameType: 'f11',
  gender: 'female',
  level: 0,
  location: {
    id: '4',
    name: 'CD Municipal La Chopera',
    location: 'Paseo de Fernán Núñez 3, 28009 Madrid',
    avatar: 'assets/field04.jpg',
  } as SportsField,
  owner: mockUser,
  players: [mockUser],
  schedule: '' as unknown as Date,
  spotsLeft: 0,
} as unknown as Game;

export const mockPartialGame = {
  id: 'test',
  location: {
    id: '4',
    name: 'CD Municipal La Chopera',
    location: 'Paseo de Fernán Núñez 3, 28009 Madrid',
    avatar: 'assets/field04.jpg',
  } as SportsField,
  owner: mockUser,
  players: [mockUser],
  schedule: '' as unknown as Date,
  spotsLeft: 0,
} as unknown as Game;
