import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from 'src/models/user';
import { UserLogin } from 'src/types/user.login';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('When userRegister is called', () => {
    it('Should register a user', () => {
      const user = {
        userName: 'Fratini',
        password: '12345',
        email: 'marco@fratini.com',
      } as User;

      userService.userRegister(new FormData()).subscribe((response) => {
        expect(response).toEqual(user);
      });

      const req = httpMock.expectOne((request) => request.method === 'POST');
      req.flush(user);
    });
  });

  describe('When userLogin is called', () => {
    it('Should login a user', () => {
      const userLogin = {
        user: 'Fratini',
        password: '12345',
      } as UserLogin;
      const mockToken = {
        token: '',
        user: {} as User,
      };

      userService.userLogin(userLogin).subscribe((response) => {
        expect(response).toEqual(mockToken);
      });

      const req = httpMock.expectOne((request) => request.method === 'PATCH');
      req.flush(mockToken);
    });
  });

  describe('When userLogout is called', () => {
    it('Should logout a user', () => {
      spyOn(localStorage, 'removeItem').and.callThrough();
      spyOn(userService.token$, 'next').and.callThrough();
      userService.userLogout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('userToken');
    });
  });

  describe('When the data is not valid', () => {
    it('Should handle error', () => {
      const mockError: HttpErrorResponse = {
        status: 404,
        statusText: 'Not Found',
      } as HttpErrorResponse;
      userService.handleError(mockError).subscribe(
        () => fail('should have failed with 404 error'),
        (error) => expect(error).toContain('Not Found')
      );
    });
  });
});
