import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListComponent } from './game.list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from 'src/app/menu/menu.component';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/models/game';
import { BehaviorSubject, of } from 'rxjs';
import { SportsField } from 'src/types/sports.field';
import { User } from 'src/models/user';

describe('GameListComponent', () => {
  let gameService: GameService;
  const mockGameService = {
    getAllGames: jasmine.createSpy('getAllGames').and.returnValue(
      of([
        {
          id: '',
          gameType: 'f11',
          gender: 'female',
          level: 1,
          location: {} as SportsField,
          owner: {} as User,
          players: [{} as unknown as User],
          schedule: '' as unknown as Date,
          spotsLeft: 0,
          avatar: {},
        } as Game,
        {
          id: '',
          gameType: 'f11',
          gender: 'female',
          level: 1,
          location: {} as SportsField,
          owner: {} as User,
          players: [{} as unknown as User],
          schedule: '' as unknown as Date,
          spotsLeft: 0,
          avatar: {},
        } as Game,
      ])
    ),
    games$: new BehaviorSubject<Game[]>([]),
    next$: new BehaviorSubject<string | null>(null),
    prev$: new BehaviorSubject<string | null>(null),
  };
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [GameListComponent, MenuComponent],
      providers: [{ provide: GameService, useValue: mockGameService }],
    });
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When ngOnInit is called', () => {
    it('Should call loadAllGames', () => {
      fixture.detectChanges();
      const loadAllGames = spyOn(component, 'loadAllGames').and.callThrough();

      component.ngOnInit();
      expect(loadAllGames).toHaveBeenCalled();
    });
  });

  describe('When loadAllGames is called', () => {
    it('Should call getAllGames from gameService', () => {
      const mockGames: Game[] = [
        {
          id: '',
          gameType: 'f11',
          gender: 'female',
          level: 1,
          location: {} as SportsField,
          owner: {} as User,
          players: [{} as unknown as User],
          schedule: '' as unknown as Date,
          spotsLeft: 0,
          avatar: {
            urlOriginal: '',
            url: '',
            mimetype: '',
            size: 0,
          },
        } as Game,
        {
          id: '',
          gameType: 'f11',
          gender: 'female',
          level: 1,
          location: {} as SportsField,
          owner: {} as User,
          players: [{} as unknown as User],
          schedule: '' as unknown as Date,
          spotsLeft: 0,
          avatar: { urlOriginal: '', url: '', mimetype: '', size: 0 },
        } as Game,
      ];
      const nextValue = null;
      const prevValue = null;

      spyOn(gameService.games$, 'next');
      spyOnProperty(gameService, 'next$').and.returnValue(
        new BehaviorSubject<string | null>(nextValue)
      );
      spyOnProperty(gameService, 'prev$').and.returnValue(
        new BehaviorSubject<string | null>(prevValue)
      );

      component.loadAllGames();

      expect(gameService.getAllGames).toHaveBeenCalled();
      expect(component.items).toEqual(mockGames);
      expect(gameService.games$.next).toHaveBeenCalledWith(mockGames);
      expect(component.next).toBe(nextValue);
      expect(component.prev).toBe(prevValue);
    });
  });

  describe('When handleNext is called and there is this.next', () => {
    it('Should call getAllGames with this.next', () => {
      const mockNext = 'http://localhost:9999/game?page=2';
      component.next = mockNext;
      component.handleNext();

      expect(gameService.getAllGames).toHaveBeenCalledWith(mockNext);
    });
  });
  describe('When handleNext is called and there is no this.next', () => {
    it('Should not call getAllGames', () => {
      const mockNext = null;
      component.next = mockNext;
      component.handleNext();

      expect(gameService.getAllGames).not.toHaveBeenCalled();
    });
  });

  describe('When handlePrev is called and there is this.prev', () => {
    it('Should call getAllGames with this.prev', () => {
      const mockPrev = 'http://localhost:9999/game?page=1';
      component.prev = mockPrev;
      component.handlePrevious();

      expect(gameService.getAllGames).toHaveBeenCalledWith(mockPrev);
    });
  });
  describe('When handleNext is called and there is no this.prev', () => {
    it('Should not call getAllGames', () => {
      const mockPrev = null;
      component.prev = mockPrev;
      component.handlePrevious();

      expect(gameService.getAllGames).not.toHaveBeenCalled();
    });
  });
});
