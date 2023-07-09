import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
import { GameCardComponent } from './game.card.component';
import { of } from 'rxjs';
import { Game } from 'src/models/game';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Other imports...

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let gameService: GameService;
  let userService: UserService;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [GameCardComponent],
      providers: [
        GameService,
        UserService,
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    userService = TestBed.inject(UserService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);

    spyOn(gameService, 'getGame').and.returnValue(of({} as Game));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
