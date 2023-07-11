import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { Location } from '@angular/common';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  const mockLocation = jasmine
    .createSpy('location')
    .and.returnValue({ back: jasmine.createSpy('back') });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [{ provide: Location, useValue: mockLocation }],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
