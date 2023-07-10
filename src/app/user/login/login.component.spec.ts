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
  let mockUserService: UserService;

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

    expect(mockUserService.userLogin).toHaveBeenCalledWith(mockUser);
    expect(mockUserService.token$.next).toHaveBeenCalled();
  });

  it('should handle error on submit', () => {
    const mockUser = { user: 'test', password: 'test' };
    component.login.setValue(mockUser);

    spyOn(Swal, 'fire');

    component.handleLogin();

    expect(Swal.fire).toHaveBeenCalled();
  });
});
