import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let userService: UserService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  const mockUserService = {
    token$: {
      next: jasmine.createSpy('next'),
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent, LayoutComponent, HeaderComponent],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('When ngOnInit is called', () => {
    it('Should call getInitialToken', () => {
      const getInitialToken = spyOn(app, 'getInitialToken').and.callThrough();

      app.ngOnInit();

      expect(getInitialToken).toHaveBeenCalled();
    });
  });

  describe('When getInitialToken is called and there is already a token', () => {
    it('Should call next with the userInfo', () => {
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify({
          token: 'test',
          user: { userName: 'test', id: 'test' },
        })
      );

      app.getInitialToken();

      expect(userService.token$.next).toHaveBeenCalledWith({
        token: 'test',
        user: { userName: 'test', id: 'test' },
      });
    });
  });
});
