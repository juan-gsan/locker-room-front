import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameCardComponent } from './game.card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from 'src/app/services/game.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MenuComponent } from 'src/app/menu/menu.component';
import { Game } from 'src/models/game';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let routeMock: Partial<ActivatedRoute>;
  let gameService: GameService;
  const mockGameService = {
    getGame: jasmine
      .createSpy('getGame')
      .and.returnValue(of({} as unknown as Game)),
  };

  beforeEach(() => {
    routeMock = {
      params: of({
        id: '12345',
        gameType: '',
        schedule: '',
        level: 0,
        gender: '',
        spotsLeft: 0,
        location: {},
        owner: {},
        players: [{}],
      }),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [GameCardComponent, MenuComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: GameService, useValue: mockGameService },
      ],
    });

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When ngOnInit is called', () => {
    it('Should call loadGameCard with the card id as params', () => {
      spyOn(component, 'loadGameCard').and.callThrough();
      component.ngOnInit();
      expect(component.loadGameCard).toHaveBeenCalledWith('');
    });
  });

  describe('When loadGameCard is called', () => {
    it('Should call getGame', () => {
      component.loadGameCard('12345');
      expect(gameService.getGame).toHaveBeenCalled();
    });
  });
});
