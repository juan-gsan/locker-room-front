// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ErrorComponent } from './error.component';
// import { Location } from '@angular/common';

// describe('ErrorComponent', () => {
//   let component: ErrorComponent;
//   let fixture: ComponentFixture<ErrorComponent>;
//   let location: Location;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ErrorComponent],
//       providers: [{ provide: Location, useValue: location }],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ErrorComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should navigate back to the previous url', () => {
//     location = jasmine.createSpyObj('Location', ['back']);
//     component.navigateBack();

//     expect(location.back).toHaveBeenCalled();
//   });
// });
