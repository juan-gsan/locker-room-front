// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { GameFormComponent } from './game.form.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MenuComponent } from 'src/app/menu/menu.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { GameService } from 'src/app/services/game.service';
// import { of } from 'rxjs';
// import { Game } from 'src/models/game';

// describe('GameFormComponent', () => {
//   let component: GameFormComponent;
//   let fixture: ComponentFixture<GameFormComponent>;
//   let mockRoute: ActivatedRoute;
//   let gameService: GameService;

//   const mockGameService = {
//     getGame: of({ id: '1' }),
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         RouterTestingModule,
//         ReactiveFormsModule,
//       ],
//       declarations: [GameFormComponent, MenuComponent],
//       providers: [
//         GameFormComponent,
//         {
//           provide: ActivatedRoute,
//           useValue: { snapshot: { url: [{ path: 'create' }] } },
//         },
//         { provide: GameService, useValue: mockGameService },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(GameFormComponent);

//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call checkNew when ngOnInit', () => {
//     const mockCheckNew = spyOn(component, 'checkNew');
//     component.ngOnInit();
//     expect(mockCheckNew).toHaveBeenCalled();
//   });

//   it('should call getCurrentGame when ngOnInit', () => {
//     const mockGetCurrentGameData = spyOn(component, 'getCurrentGameData');
//     component.isNew = false;
//     component.ngOnInit();

//     expect(mockGetCurrentGameData).toHaveBeenCalled();
//   });

//   it('should check if the element is new', () => {
//     mockRoute.snapshot.url.some((segment) =>
//       expect(segment.path).toEqual('create')
//     );
//     component.checkNew();

//     expect(component.isNew).toBe(true);
//   });

//   it('should call getGame when getCurrentGameData is called', () => {
//     component.isNew = false;
//     const mockCurrentGameData = { id: '1' } as Game;
//     const mockGetFormInitialValues = spyOn(component, 'getFormInitialValues');
//     component.getCurrentGameData();

//     gameService.getGame('1').subscribe((data) => {
//       expect(mockCurrentGameData).toEqual(data);
//       expect(mockGetFormInitialValues).toHaveBeenCalled();
//     });
//   });
// });
