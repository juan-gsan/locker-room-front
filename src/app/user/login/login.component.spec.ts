import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, of } from 'rxjs';
import { Token } from 'src/types/token';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let userService: UserService;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>(['navigateByUrl']);

    const mockToken: Token = {
      token: 'test',
      user: { userName: 'test', id: 'test' },
    };

    const mockUserService = {
      token$: new BehaviorSubject<Token>(mockToken),
      userLogin: jasmine
        .createSpy('userLogin')
        .and.returnValue(of({ mockToken })),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle login on submit', () => {
    const mockUser = { user: 'test', password: 'test' };
    component.login.setValue(mockUser);

    component.handleLogin();

    userService.userLogin(mockUser).subscribe();
    expect(userService.userLogin).toHaveBeenCalledWith(mockUser);
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  });
});
