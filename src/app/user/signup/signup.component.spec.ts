/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj<UserService>(['userRegister']);
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [SignupComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    });

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should append image to FormData when handleSubmit is called and image is not null', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const formDataMock = jasmine.createSpyObj(['append']);
    spyOn(window, 'FormData').and.returnValue(formDataMock as any);
    component.signup.value.avatar = file;

    mockUserService.userRegister.and.returnValue(of());

    component.handleSignup();

    expect(formDataMock.append).toHaveBeenCalled();
  });
});
