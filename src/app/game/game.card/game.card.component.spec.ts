import { BehaviorSubject, of } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
import { Game } from 'src/models/game';
import { User } from 'src/models/user';
import { SportsField } from 'src/types/sports.field';
import { GameCardComponent } from './game.card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MenuComponent } from 'src/app/menu/menu.component';
import { Token } from '@angular/compiler';
import { ActivatedRoute, Params, Router } from '@angular/router';

describe('GameCardComponent', () => {
  let gameService: GameService;
  let userService: UserService;

  const mockGameService = {
    getAllGames: jasmine
      .createSpy('getAllGames')
      .and.returnValue(of([{} as Game, {} as Game])),
    getGame: jasmine.createSpy('getGame').and.returnValue(
      of({
        id: 'test',
        gameType: 'f11',
        gender: 'female',
        level: 1,
        location: {
          id: '4',
          name: 'CD Municipal La Chopera',
          location: 'Paseo de Fernán Núñez 3, 28009 Madrid',
          avatar: 'assets/field04.jpg',
        } as SportsField,
        owner: {
          id: 'test',
          userName: 'test',
          email: 'email@example.com',
          password: 'password',
          level: 1,
          gender: 'female',
          avatar: { url: '', urlOriginal: '', mimetype: '', size: 1 },
        } as User,
        players: [{} as unknown as User],
        schedule: '' as unknown as Date,
        spotsLeft: 0,
      } as Game)
    ),
    joinGame: jasmine.createSpy('joinGame').and.returnValue(
      of({
        id: 'test',
        gameType: 'f11',
        gender: 'female',
        level: 1,
        location: {
          id: '4',
          name: 'CD Municipal La Chopera',
          location: 'Paseo de Fernán Núñez 3, 28009 Madrid',
          avatar: 'assets/field04.jpg',
        } as SportsField,
        owner: {
          id: 'test',
          userName: 'test',
          email: 'email@example.com',
          password: 'password',
          level: 1,
          gender: 'female',
          avatar: { url: '', urlOriginal: '', mimetype: '', size: 1 },
        } as User,
        players: [
          {},
          {
            id: 'user',
            userName: 'test',
            email: 'email@example.com',
            password: 'password',
            avatar: { url: '', urlOriginal: '', mimetype: '', size: 1 },
          },
        ],
        schedule: '' as unknown as Date,
        spotsLeft: 0,
      } as Game)
    ),
    leaveGame: jasmine.createSpy('leaveGame').and.returnValue(
      of({
        id: 'test',
        gameType: 'f11',
        gender: 'female',
        level: 1,
        location: {
          id: '4',
          name: 'CD Municipal La Chopera',
          location: 'Paseo de Fernán Núñez 3, 28009 Madrid',
          avatar: 'assets/field04.jpg',
        } as SportsField,
        owner: {
          id: 'test',
          userName: 'test',
          email: 'email@example.com',
          password: 'password',
          level: 1,
          gender: 'female',
          avatar: { url: '', urlOriginal: '', mimetype: '', size: 1 },
        } as User,
        players: [],
        schedule: '' as unknown as Date,
        spotsLeft: 0,
      } as Game)
    ),
    deleteGame: jasmine.createSpy('deleteGame').and.returnValue(of({})),
    game$: new BehaviorSubject<Game>({} as Game),
    games$: new BehaviorSubject<Game[]>([{} as Game, {} as Game]),
  };

  const mockUserService = {
    token$: new BehaviorSubject<Token>({
      user: { id: 'user' } as User,
    } as unknown as Token),
  };

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  const mockRoute = {
    params: of({ id: 'test' }) as Params,
  };

  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GameCardComponent, MenuComponent],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When ngOnInit is called', () => {
    it('Should call loadGameCard', () => {
      const loadGameCard = spyOn(component, 'loadGameCard');
      component.ngOnInit();

      expect(loadGameCard).toHaveBeenCalled();
    });
  });

  describe('When loadGameCard is called', () => {
    it('Should call getGame', () => {
      const mockGame = {
        id: 'test',
        gameType: 'f11',
        gender: 'female',
        level: 1,
        location: {
          id: '4',
          name: 'CD Municipal La Chopera',
          location: 'Paseo de Fernán Núñez 3, 28009 Madrid',
          avatar: 'assets/field04.jpg',
        } as SportsField,
        owner: {
          id: 'test',
          userName: 'test',
          email: 'email@example.com',
          password: 'password',
          level: 1,
          gender: 'female',
          avatar: { url: '', urlOriginal: '', mimetype: '', size: 1 },
        } as User,
        players: [{} as unknown as User],
        schedule: '' as unknown as Date,
        spotsLeft: 0,
      } as Game;

      mockGameService.getGame.and.returnValue(of(mockGame));
      component.loadGameCard('test');
      expect(mockGameService.getGame).toHaveBeenCalledWith('test');
    });
  });

  describe('When checkToken is called', () => {
    it('Should check if there is token', () => {
      const mockToken = { token: 'token', user: {} };
      spyOn(userService.token$, 'subscribe').and.callThrough();

      component.checkToken();

      expect(userService.token$.subscribe).toHaveBeenCalled();
      userService.token$.next(mockToken);
      expect(component.isLogged).toBe(true);
    });
  });

  describe('When checkOwner is called', () => {
    it('Should check if there is owner', () => {
      const mockUser = {
        id: 'user',
        userName: 'test',
        email: 'email@example.com',
        password: 'password',
        avatar: { url: '', urlOriginal: '', mimetype: '', size: 1 },
      };
      const mockToken = { token: 'token', user: mockUser };
      const mockGame = {
        id: 'test',
        gameType: 'f11',
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
      } as Game;
      spyOn(userService.token$, 'subscribe').and.callThrough;
      spyOn(gameService.game$, 'subscribe').and.callThrough;
      userService.token$.next(mockToken);
      gameService.game$.next(mockGame);

      component.checkOwner();

      expect(userService.token$.subscribe).toHaveBeenCalled();
      expect(gameService.game$.subscribe).toHaveBeenCalled();
      expect(component.isOwner).toBe(false);
    });
  });

  describe('When checkJoined is called', () => {
    it('Should check if the user is joined', () => {
      const mockUser = {
        id: 'user',
        userName: 'test',
        email: 'email@example.com',
        password: 'password',
        avatar: { url: '', urlOriginal: '', mimetype: '', size: 1 },
      };
      const mockToken = { token: 'user', user: mockUser };
      const mockGame = {
        id: 'test',
        gameType: 'f11',
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
      } as Game;
      spyOn(userService.token$, 'subscribe').and.callThrough();
      spyOn(gameService.game$, 'subscribe').and.callThrough();

      userService.token$.next(mockToken);
      gameService.game$.next(mockGame);

      component.checkJoined();

      expect(userService.token$.subscribe).toHaveBeenCalled();
      expect(gameService.game$.subscribe).toHaveBeenCalled();
      expect(component.isJoined).toBe(true);
    });
  });

  describe('When handleJoin is called', () => {
    it('Should', () => {
      const mockUser = {
        id: 'user',
        userName: 'test',
        email: 'email@example.com',
        password: 'password',
        avatar: { url: '', urlOriginal: '', mimetype: '', size: 1 },
      };
      const mockToken = { token: 'user', user: mockUser };
      const mockGame = {
        id: 'test',
        gameType: 'f11',
        location: {
          id: '4',
          name: 'CD Municipal La Chopera',
          location: 'Paseo de Fernán Núñez 3, 28009 Madrid',
          avatar: 'assets/field04.jpg',
        } as SportsField,
        owner: {} as User,
        players: [{} as User],
        schedule: '' as unknown as Date,
        spotsLeft: 0,
      } as Game;
      spyOn(gameService.game$, 'subscribe').and.callThrough();
      gameService.game$.next(mockGame);
      userService.token$.next(mockToken);

      component.handleJoin();

      expect(gameService.joinGame).toHaveBeenCalledWith(mockGame.id, mockGame);
    });
  });

  describe('When handleEdit is called', () => {
    it('Should navigate to /game/edit', () => {
      component.handleEdit();
      expect(mockRouter.navigateByUrl).toHaveBeenCalled();
    });
  });

  describe('When handleLeave is called', () => {
    it('Should', () => {
      const mockUser = {
        id: 'user',
        userName: 'test',
        email: 'email@example.com',
        password: 'password',
        avatar: { url: '', urlOriginal: '', mimetype: '', size: 1 },
      };
      const mockToken = { token: 'user', user: mockUser };
      const mockGame = {
        id: 'test',
        gameType: 'f11',
        location: {
          id: '4',
          name: 'CD Municipal La Chopera',
          location: 'Paseo de Fernán Núñez 3, 28009 Madrid',
          avatar: 'assets/field04.jpg',
        } as SportsField,
        owner: {} as User,
        players: [{} as User],
        schedule: '' as unknown as Date,
        spotsLeft: 0,
      } as Game;
      spyOn(gameService.game$, 'subscribe').and.callThrough();
      gameService.game$.next(mockGame);
      userService.token$.next(mockToken);

      component.handleLeave();

      expect(gameService.leaveGame).toHaveBeenCalledWith(mockGame.id, mockGame);
    });
  });

  describe('When handleDelte is called', () => {
    it('Should', () => {
      const mockGames = [{} as Game, {} as Game];
      spyOn(gameService.games$, 'next');
      gameService.games$.next(mockGames);

      component.handleDelete();
      expect(gameService.getAllGames).toHaveBeenCalled();
      expect(mockRouter.navigateByUrl).toHaveBeenCalled();
    });
  });
});
