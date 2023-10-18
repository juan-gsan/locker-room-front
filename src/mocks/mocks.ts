import { FormControl, FormGroup } from '@angular/forms';
import { Game } from 'src/models/game';
import { User } from 'src/models/user';
import { GameType } from 'src/types/game.type';
import { Gender } from 'src/types/gender';
import { Level } from 'src/types/level';
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

export const formGroup: FormGroup = new FormGroup({
  location: new FormControl(''),
  schedule: new FormControl(''),
  gameType: new FormControl(''),
  level: new FormControl(null),
  gender: new FormControl(''),
});

export const mockCurrentGameData = {
  spotsLeft: 20,
  owner: {} as User,
  players: [{}],
  id: 'test',
  location: {
    name: 'Test Location',
    avatar: 'test',
    id: 'test',
    location: 'Test Location',
  },
  schedule: {} as Date,
  gameType: 'f11' as GameType,
  level: 1 as Level,
  gender: 'female' as Gender,
};
