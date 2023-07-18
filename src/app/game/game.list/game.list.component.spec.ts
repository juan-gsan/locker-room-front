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
        } as Game,
        {
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

  describe('When handleNext is called and there is this.next', () => {
    it('Should call getAllGames with this.next', () => {
      const mockNext = 'http://localhost:9999/game?offset=2';
      component.next = mockNext;
      component.handleNext();

      expect(gameService.getAllGames).toHaveBeenCalledWith(mockNext);
    });
  });

  describe('When handlePrev is called and there is this.prev', () => {
    it('Should call getAllGames with this.prev', () => {
      const mockPrev = 'http://localhost:9999/game?offset=1';
      component.prev = mockPrev;
      component.handlePrevious();

      expect(gameService.getAllGames).toHaveBeenCalledWith(mockPrev);
    });
  });

  describe('When handleNext is called with filter and there is this.next', () => {
    it('Should call getAllGames with this.next', () => {
      const mockNext = 'http://localhost:9999/game?filter=f5?offset=2';
      const mockFilter = 'f5';
      component.next = mockNext;
      component.handleNext();

      expect(gameService.getAllGames).toHaveBeenCalledWith(
        mockNext,
        mockFilter
      );
    });
  });

  describe('When handlePrev is called and there is this.prev', () => {
    it('Should call getAllGames with this.prev', () => {
      const mockPrev = 'http://localhost:9999/game?filter=f11?offset=1';
      const mockFilter = 'f11';
      component.prev = mockPrev;
      component.handlePrevious();

      expect(gameService.getAllGames).toHaveBeenCalledWith(
        mockPrev,
        mockFilter
      );
    });
  });
});
