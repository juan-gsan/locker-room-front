import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GameService } from './game.service';
import { Game } from 'src/models/game';
import { HttpErrorResponse } from '@angular/common/http';

describe('GameService', () => {
  let gameService: GameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService],
    });
    gameService = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(gameService).toBeTruthy();
  });

  describe('When getAllGames is called', () => {
    it('Should get the games array', () => {
      const mockResponse = {
        items: [{} as Game],
        next: '',
        prev: '',
      };

      gameService.getAllGames().subscribe();

      const req = httpMock.expectOne(gameService.url);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
    });
  });

  describe('When createGame is called', () => {
    it('Should create a new game', () => {
      const mockGame: Partial<Game> = {};
      gameService.createGame(mockGame).subscribe();

      const req = httpMock.expectOne(gameService.url + 'create');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toContain('Bearer ');

      req.flush(mockGame);
    });
  });

  describe('When joinGame is called', () => {
    it('Should update the current game', () => {
      const mockGame: Partial<Game> = {};
      const mockId = '123';
      gameService.joinGame(mockId, mockGame).subscribe();

      const req = httpMock.expectOne(gameService.url + 'join/' + mockId);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.headers.get('Authorization')).toContain('Bearer ');

      req.flush(mockGame);
    });
  });

  describe('When leaveGame is called', () => {
    it('Should update the current game', () => {
      const mockGame: Partial<Game> = {};
      const mockId = '123';
      gameService.leaveGame(mockId, mockGame).subscribe();

      const req = httpMock.expectOne(gameService.url + 'leave/' + mockId);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.headers.get('Authorization')).toContain('Bearer ');

      req.flush(mockGame);
    });
  });

  describe('When editGame is called', () => {
    it('Should edit the current game', () => {
      const mockGame: Partial<Game> = {};
      const mockId = '123';
      gameService.editGame(mockId, mockGame).subscribe();

      const req = httpMock.expectOne(gameService.url + 'edit/' + mockId);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.headers.get('Authorization')).toContain('Bearer ');

      req.flush(mockGame);
    });
  });

  describe('When deleteGame is called', () => {
    it('Should delete the current game', () => {
      const mockId = '123';
      gameService.deleteGame(mockId).subscribe();

      const req = httpMock.expectOne(gameService.url + mockId);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('Authorization')).toContain('Bearer ');
    });
  });

  describe('When the data is not valid', () => {
    it('Should handle error', () => {
      const mockError: HttpErrorResponse = {
        status: 404,
        statusText: 'Not Found',
      } as HttpErrorResponse;
      gameService.handleError(mockError).subscribe(
        () => fail('should have failed with 404 error'),
        (error) => expect(error).toContain('Not Found')
      );
    });
  });
});
