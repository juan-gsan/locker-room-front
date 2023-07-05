import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MenuComponent } from './menu.component';
import { UserService } from '../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  let userService: UserService;
  const mockUserService = {
    token$: new BehaviorSubject({
      token: 'test',
      user: { name: 'test', password: 'test' },
    }),
    userLogout: jasmine.createSpy('userLogout'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [MenuComponent],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When ngOnInit is called', () => {
    it('Should call handleRegistered', () => {
      spyOn(component, 'handleRegistered').and.callThrough();
      component.ngOnInit();
      expect(component.handleRegistered).toHaveBeenCalled();
    });

    it('Should set isRegistered to true when userService has a token', () => {
      component.ngOnInit();
      expect(component.isRegistered).toBe(true);
    });
  });

  describe('When handleLogout is called', () => {
    it('Should call userLogout', () => {
      component.handleLogout();
      expect(userService.userLogout).toHaveBeenCalled();
    });
  });
});
