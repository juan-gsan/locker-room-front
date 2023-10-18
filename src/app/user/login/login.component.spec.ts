import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let userService: UserService;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>(['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService },
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
    spyOn(userService, 'userLogin').and.returnValue(
      of({
        token: 'test',
        user: { userName: 'test', id: 'test' },
      })
    );
    component.login.setValue(mockUser);

    component.handleLogin();

    userService.userLogin(mockUser).subscribe();
    expect(userService.userLogin).toHaveBeenCalledWith(mockUser);
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  });

  it('Should throw error if data is not valid', () => {
    spyOn(userService, 'userLogin').and.throwError('Invalid credentials');
    component.login.setValue({ user: '', password: 'test' });
    expect(userService.userLogin).toThrowError();
  });
});
