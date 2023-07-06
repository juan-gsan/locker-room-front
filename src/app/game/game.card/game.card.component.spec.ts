import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCardComponent } from './game.card.component';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { Game } from 'src/models/game';
import { MenuComponent } from 'src/app/menu/menu.component';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('GameService', [
      'getGame',
      'joinGame',
      'deleteGame',
      'getAllGames',
    ]);
    mockUserService = jasmine.createSpyObj('UserService', [], {
      token$: of({ token: 'mockToken', user: { id: 'mockUserId' } }),
    });
    mockActivatedRoute = { params: of({ id: 'mockGameId' }) };
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [GameCardComponent, MenuComponent],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load game card on initialization', () => {
    const mockGame = {
      id: 'mockGameId',
      owner: { id: 'mockUserId' },
      players: [],
    } as unknown as Game;
    mockGameService.getGame.and.returnValue(of(mockGame));

    component.ngOnInit();

    expect(component.game).toEqual(mockGame);
    expect(mockGameService.game$.next).toHaveBeenCalledWith(mockGame);
  });

  it('should set isLogged to true when token exists', () => {
    expect(component.isLogged).toBeFalse();

    component.checkToken();

    expect(component.isLogged).toBeTrue();
  });

  it('should set isOwner to true when the user is the owner of the game', () => {
    const mockGame = {
      id: 'mockGameId',
      owner: { id: 'mockUserId' },
      players: [],
    } as unknown as Game;
    mockGameService.game$.next(mockGame);
    mockUserService.token$.next({
      token: 'mockToken',
      user: { id: 'mockUserId' },
    });

    component.checkOwner();

    expect(component.isOwner).toBeTrue();
  });

  it('should set isJoined to true when the user is already joined in the game', () => {
    const mockGame = {
      id: 'mockGameId',
      owner: { id: 'mockOwnerId' },
      players: [{ id: 'mockUserId' }],
    } as unknown as Game;
    mockGameService.game$.next(mockGame);
    mockUserService.token$.next({
      token: 'mockToken',
      user: { id: 'mockUserId' },
    });

    component.checkJoined();

    expect(component.isJoined).toBeTrue();
  });

  it('should add the user to the game and decrease spotsLeft when joining a game', () => {
    const mockGame = {
      id: 'mockGameId',
      owner: { id: 'mockOwnerId' },
      players: [],
      spotsLeft: 5,
    } as unknown as Game;
    mockGameService.game$.next(mockGame);
    mockUserService.token$.next({
      token: 'mockToken',
      user: { id: 'mockUserId' },
    });

    component.handleJoin();

    expect(component.isJoined).toBeTrue();
    expect(mockGameService.joinGame).toHaveBeenCalledWith(
      mockGame.id,
      jasmine.objectContaining({ id: 'mockGameId' })
    );
  });

  it('should navigate to the game edit page when editing a game', () => {
    const navigateSpy = mockRouter.navigateByUrl as jasmine.Spy;
    const mockGameId = 'mockGameId';
    component.game.id = mockGameId;

    component.handleEdit();

    expect(navigateSpy).toHaveBeenCalledWith('/game/edit/' + mockGameId);
  });

  it('should delete a game and navigate to the game list page', () => {
    const mockGameId = 'mockGameId';
    const mockGames = [
      { id: 'mockGameId1' },
      { id: 'mockGameId2' },
    ] as unknown as Game[];
    mockGameService.deleteGame.and.returnValue(of({}));
    mockGameService.getAllGames.and.returnValue(of(mockGames));
    const navigateSpy = mockRouter.navigateByUrl as jasmine.Spy;

    component.handleDelete();

    expect(mockGameService.deleteGame).toHaveBeenCalledWith(mockGameId);
    expect(mockGameService.getAllGames).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith('game');
    expect(mockGameService.games$.next).toHaveBeenCalledWith(mockGames);
  });
});
