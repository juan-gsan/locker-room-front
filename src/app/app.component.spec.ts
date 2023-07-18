import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { UserService } from './services/user.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let userService: UserService;
  const mockUserService = {
    token$: {
      next: jasmine.createSpy('next'),
    },
    getToken: jasmine.createSpy('getToken').and.callFake((token) => {
      return of(token);
    }),
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent, LayoutComponent, HeaderComponent],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents()
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('When ngOnInit is called', () => {
    it('Should call getInitialToken', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const getInitialToken = spyOn(app, 'getInitialToken').and.callThrough();

      app.ngOnInit();

      expect(getInitialToken).toHaveBeenCalled();
    });
  });

  describe('When getInitialToken is called and there is already a token', () => {
    it('Should call next with the userInfo', () => {
      userService = TestBed.inject(UserService);
      const fixture = TestBed.createComponent(AppComponent);

      const app = fixture.componentInstance;
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify({
          token: 'test',
          user: { userName: 'test', id: 'test' },
        })
      );

      app.getInitialToken();

      expect(userService.token$.next).toHaveBeenCalledOnceWith({
        token: 'test',
        user: { userName: 'test', id: 'test' },
      });
    });
  });

  describe('When getInitialToken is called and there is no token', () => {
    it('Should not call next', () => {
      userService = TestBed.inject(UserService);
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(localStorage, 'getItem').and.returnValue('{}');

      app.getInitialToken();

      expect(userService.token$.next).not.toHaveBeenCalled();
    });
  });
});
