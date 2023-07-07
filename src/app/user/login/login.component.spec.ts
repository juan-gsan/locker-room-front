import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Token } from 'src/types/token';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>(['navigate']);

    const mockToken: Token = {
      token: 'token',
      user: { userName: 'test' },
    };

    const token$ = new BehaviorSubject<Token>(mockToken);

    mockUserService = jasmine.createSpyObj<UserService>([
      'userLogin',
      'userRegister',
      'token$',
    ]);

    mockUserService.token$ = token$;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle login on submit', () => {
    const userLogin = { user: 'test', password: 'test' };
    component.login.setValue(userLogin);

    mockUserService.userLogin.and.returnValue(of());
    spyOn(Swal, 'fire');

    component.handleLogin();

    expect(mockUserService.userLogin).toHaveBeenCalledWith(userLogin);
  });
  it('should handle error on submit', () => {
    const userLogin = { user: 'test', passwd: 'test' };
    component.login.setValue(userLogin);

    mockUserService.userLogin.and.returnValue(throwError('error'));
    spyOn(Swal, 'fire');

    component.handleLogin();

    expect(Swal.fire).toHaveBeenCalled();
  });
});
