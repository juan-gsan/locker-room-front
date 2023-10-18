import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameFormComponent } from './game.form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from 'src/app/menu/menu.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { of } from 'rxjs';
import { Game } from 'src/models/game';
import { SportsField } from 'src/types/sports.field';
import { User } from 'src/models/user';
import Swal from 'sweetalert2';
import { mockGame } from 'src/mocks/mocks';

describe('GameFormComponent', () => {
  let component: GameFormComponent;
  let fixture: ComponentFixture<GameFormComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let gameService: GameService;

  const mockRoute = {
    snapshot: {
      params: 'test',
      url: [{ path: 'create' }],
    } as unknown as ActivatedRouteSnapshot,
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
    createGame: jasmine.createSpy('createGame').and.returnValue(of(mockGame)),
    editGame: jasmine.createSpy('editGame').and.returnValue(of(mockGame)),
  };

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [GameFormComponent, MenuComponent],
      providers: [
        GameFormComponent,
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: mockRoute,
        },
        { provide: GameService, useValue: mockGameService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameFormComponent);
    route = TestBed.inject(ActivatedRoute);
    gameService = TestBed.inject(GameService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkNew when ngOnInit', () => {
    const mockCheckNew = spyOn(component, 'checkNew');
    component.ngOnInit();
    expect(mockCheckNew).toHaveBeenCalled();
  });

  it('should call getCurrentGame when ngOnInit', () => {
    spyOn(component, 'checkNew');
    component.isNew = false;
    const mockGetCurrentGameData = spyOn(component, 'getCurrentGameData');

    component.ngOnInit();
    expect(mockGetCurrentGameData).toHaveBeenCalled();
  });

  it('should check if the element is new', () => {
    route.snapshot.url.some((segment) => {
      expect(segment.path).toEqual('create');
    });
    component.checkNew();

    expect(component.isNew).toBe(true);
  });

  it('should call getGame when getCurrentGameData is called', () => {
    component.isNew = false;
    const mockCurrentGameData = {
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

    const mockGetFormInitialValues = spyOn(component, 'getFormInitialValues');
    component.getCurrentGameData();

    gameService.getGame(mockRoute.snapshot.params['id']).subscribe((data) => {
      expect(mockCurrentGameData).toEqual(data);
      expect(mockGetFormInitialValues).toHaveBeenCalled();
    });
  });

  it('Should get initial values when getFormInitialValues is called', () => {
    const formGroup: FormGroup = new FormGroup({
      location: new FormControl(''),
      schedule: new FormControl(''),
      gameType: new FormControl(''),
      level: new FormControl(null),
      gender: new FormControl(''),
    });
    component.game = formGroup;

    component.currentGameData = {
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
      gameType: 'f11',
      level: 1,
      gender: 'female',
    };

    component.getFormInitialValues();

    expect(formGroup.value).toEqual({
      location: 'Test Location',
      schedule: {} as Date,
      gameType: 'f11',
      level: 1,
      gender: 'female',
    });
  });

  it('Should create a game when handleGame is called and it is new', () => {
    const formGroup: FormGroup = new FormGroup({
      location: new FormControl(''),
      schedule: new FormControl(''),
      gameType: new FormControl(''),
      level: new FormControl(null),
      gender: new FormControl(''),
    });

    component.game = formGroup;
    component.currentGameData = mockGame;
    component.handleGame();

    expect(gameService.createGame).toHaveBeenCalled();
  });

  it('Should edit game when handleGame is called and it is not new', () => {
    const formGroup: FormGroup = new FormGroup({
      location: new FormControl(''),
      schedule: new FormControl(''),
      gameType: new FormControl(''),
      level: new FormControl(null),
      gender: new FormControl(''),
    });

    component.isNew = false;
    component.game = formGroup;
    component.currentGameData = mockGame;
    component.handleGame();

    expect(gameService.editGame).toHaveBeenCalled();
  });
});
