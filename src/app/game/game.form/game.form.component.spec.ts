import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameFormComponent } from './game.form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MenuComponent } from 'src/app/menu/menu.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { of } from 'rxjs';
import { formGroup, mockCurrentGameData, mockGame } from 'src/mocks/mocks';

describe('GameFormComponent', () => {
  let component: GameFormComponent;
  let fixture: ComponentFixture<GameFormComponent>;
  let route: ActivatedRoute;
  let gameService: GameService;

  const mockRoute = {
    snapshot: {
      params: 'test',
      url: [{ path: 'create' }],
    } as unknown as ActivatedRouteSnapshot,
  };

  const mockGameService = {
    getGame: jasmine.createSpy('getGame').and.returnValue(of(mockGame)),
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

    const mockGetFormInitialValues = spyOn(component, 'getFormInitialValues');
    component.getCurrentGameData();

    gameService.getGame(mockRoute.snapshot.params['id']).subscribe((data) => {
      expect(mockGame).toEqual(data);
      expect(mockGetFormInitialValues).toHaveBeenCalled();
    });
  });

  it('Should get initial values when getFormInitialValues is called', () => {
    component.game = formGroup;
    component.currentGameData = mockCurrentGameData;

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
    component.isNew = true;
    component.game = formGroup;
    component.currentGameData = mockGame;
    component.handleGame();

    expect(gameService.createGame).toHaveBeenCalled();
  });

  it('Should edit game when handleGame is called and it is not new', () => {
    component.isNew = false;
    component.game = formGroup;
    component.currentGameData = mockGame;
    component.handleGame();

    expect(gameService.editGame).toHaveBeenCalled();
  });
});
