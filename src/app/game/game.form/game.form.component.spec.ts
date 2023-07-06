import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameFormComponent } from './game.form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from 'src/app/menu/menu.component';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/models/game';
import { SportsField } from 'src/types/sports.field';
import Swal from 'sweetalert2';

describe('GameFormComponent', () => {
  let component: GameFormComponent;
  let fixture: ComponentFixture<GameFormComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;

  beforeEach(() => {
    mockGameService = jasmine.createSpyObj<GameService>([
      'getGame',
      'createGame',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [GameFormComponent, MenuComponent],
      providers: [
        GameFormComponent,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: [], params: { id: 'gameId' } } },
        },
        {
          provide: GameService,
          useValue: mockGameService,
        },
      ],
    });

    fixture = TestBed.createComponent(GameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkNew', () => {
    spyOn(component, 'checkNew');
    component.ngOnInit();

    expect(component.checkNew).toHaveBeenCalled();
  });

  it('should set isNew to true when URL contains "create" segment', () => {
    const urlSegments: UrlSegment[] = [new UrlSegment('create', {})];
    component.route.snapshot.url = urlSegments;

    component.checkNew();

    expect(component.isNew).toBeTrue();
    expect(urlSegments.some).toBeTrue();
  });

  it('should not set isNew to true when URL does not contain "create" segment', () => {
    const urlSegments: UrlSegment[] = [new UrlSegment('edit', {})];
    component.route.snapshot.url = urlSegments;

    component.checkNew();

    expect(component.isNew).toBeFalse();
  });

  it('should get current game data and set form initial values if not new', () => {
    component.isNew = false;

    component.getCurrentGameData();

    expect(mockGameService.getGame).toHaveBeenCalledWith('gameId');
    expect(component.currentGameData).toEqual({} as Game);
    expect(component.getFormInitialValues).toHaveBeenCalled();
  });

  it('should not get current game data if new', () => {
    component.isNew = true;

    component.getCurrentGameData();

    expect(mockGameService.getGame).not.toHaveBeenCalled();
  });

  it('should create a new game', () => {
    const newGame = {
      gameType: 'f11',
      gender: 'female',
      level: 1,
      location: {} as SportsField,
      schedule: '' as unknown as Date,
    } as Partial<Game>;

    component.isNew = true;
    spyOn(Swal, 'fire');
    component.handleGame();

    expect(mockGameService.createGame).toHaveBeenCalledWith(newGame);
    expect(Swal.fire).toHaveBeenCalled();
  });
});
