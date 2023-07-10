/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
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

  it('should handle error on submit', () => {
    const userRegister = {
      userName: 'user',
      email: 'email@example.com',
      password: 'password',
      level: 0,
      gender: 'test',
      avatar: 'test',
    };
    component.signup.setValue(userRegister);

    mockUserService.userRegister.and.returnValue(throwError('error'));
    spyOn(Swal, 'fire');

    component.handleSignup();

    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should update the image when onFileChange is called', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });

    const mockFileList: {
      [index: number]: File;
      length: number;
      item: (index: number) => File | null;
    } = {
      0: file,
      length: 1,
      item: (index: number): File | null => mockFileList[index] || null,
    };

    const event = { target: { files: mockFileList } } as any;
    component.handleFileInput(event);
    expect(component.signup.value.avatar).toEqual(file);
  });

  it('should handle registration on submit', () => {
    const userRegister = {
      userName: 'user',
      email: 'email@example.com',
      password: 'password',
      level: 0,
      gender: 'test',
      avatar: 'test',
    };
    component.signup.setValue(userRegister);
    mockUserService.userRegister.and.returnValue(of());
    component.avatar = new File(['test'], 'test.jpg');
    component.handleSignup();

    expect(mockUserService.userRegister).toHaveBeenCalled();
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
