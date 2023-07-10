import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

import { GameCardComponent } from './game.card.component';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from 'src/app/menu/menu.component';
import { UserService } from 'src/app/services/user.service';
import { Game } from 'src/models/game';
import { SportsField } from 'src/types/sports.field';
import { User } from 'src/models/user';
import { Token } from 'src/types/token';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let gameService: GameService;
  let userService: UserService;
  let route: ActivatedRoute;

  const mockUserService = {
    token$: new BehaviorSubject<Token>({
      token: 'test',
      user: { id: 'test', userName: 'test' },
    } as Token),
  };
  const mockGameService = {
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
    game$: new BehaviorSubject<Game>({} as Game),
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
            id: 'test',
            userName: 'test',
          },
        ],
        schedule: '' as unknown as Date,
        spotsLeft: 0,
      } as Game)
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [GameCardComponent, MenuComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { route: 'game', params: of({ id: 'test' }) },
        },
        { provide: GameService, useValue: mockGameService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    userService = TestBed.inject(UserService);
    route = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  describe('When it is instantiated', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('When ngOnInit is called', () => {
    it('should call loadGameCard', () => {
      const mockLoad = spyOn(component, 'loadGameCard');
      const mockParams = 'test';

      component.ngOnInit();
      route.params.subscribe((params) => {
        expect(mockParams).toEqual(params['id']);
      });

      expect(mockLoad).toHaveBeenCalledWith(mockParams);
    });
  });

  describe('When checkOwner is called and the owner and game id match', () => {
    it('should switch isOwner to true', () => {
      component.checkOwner();
      userService.token$.subscribe(() =>
        gameService.game$.subscribe(() => {
          component.isOwner = true;
          expect(component.isOwner).toBe(true);
        })
      );
    });
  });

  describe('When checkJoined is called and player and game id match', () => {
    it('should switch the isJoined state to true', () => {
      component.checkJoined();
      userService.token$.subscribe(() => {
        component.isJoined = true;
        gameService.game$.subscribe(() =>
          expect(component.isJoined).toBe(true)
        );
      });
    });
  });
});
