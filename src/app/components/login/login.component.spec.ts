import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../../app.module';
import { UserService } from '../../services/user.service';
import { LoginComponent } from '../login/login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUserService = { signIn: () => Promise.resolve(true) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, AppModule],
      providers: [
        {
          provide: UserService, useValue: mockUserService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('UI fields', () => {
    it('should have Sign in text', () => {
      const h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.textContent.trim()).toEqual('Sign in');
    });

    it('should have email label', () => {
      const label = fixture.nativeElement.querySelector('.input-email');
      expect(label.textContent.trim()).toEqual('Email');
    });

    it('should have input element of email type', () => {
      const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#inputEmail');
      expect(nameInput.type).toEqual('email');
    });

    it('should have correct placeholder for email', () => {
      const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#inputEmail');
      expect(nameInput.placeholder).toEqual('Email address');
    });
  });

  describe('validation message', () => {
    it('should not display validation message by default', () => {
      const validationMsg = fixture.nativeElement.querySelector('#validation_message');
      expect(validationMsg).not.toBeTruthy();
    });

    it('should show email validation message when login is clicked without entering email', () => {
      const loginButton = fixture.nativeElement.querySelector('button');
      loginButton.click();
      fixture.detectChanges();
      const validationMsg = fixture.nativeElement.querySelector('#validation_message');
      expect(validationMsg.textContent.trim()).toEqual('Please enter valid email');
    });

    it('should not show validation message when valid email and password is entered', () => {
      const loginButton = fixture.nativeElement.querySelector('button');
      component.email = 'sathya@gmail.com';
      component.password = 'hello';
      loginButton.click();
      fixture.detectChanges();
      const validationMsg = fixture.nativeElement.querySelector('#validation_message');
      expect(validationMsg).not.toBeTruthy();
    });
  });

  describe('Test API', () => {
    it('should call userService.login with correct and email', fakeAsync(() => {
      let userService = fixture.debugElement.injector.get(UserService);
      spyOn(userService, 'signIn');
      const loginButton = fixture.nativeElement.querySelector('button');
      component.email = 'sathya@gmail.com';
      component.password = 'hello';
      loginButton.click();
      expect(userService.signIn).toHaveBeenCalledWith('sathya@gmail.com', 'hello');
    }));

    it('should show error message when server auth fails', fakeAsync(() => {
      let userService = fixture.debugElement.injector.get(UserService);
      spyOn(userService, 'signIn').and.callFake(() => Promise.reject());
      const loginButton = fixture.nativeElement.querySelector('button');
      component.email = 'sathya@gmail.com';
      component.password = 'hello';
      loginButton.click();
      tick();
      fixture.detectChanges();
      const validationMsg = fixture.nativeElement.querySelector('#validation_message');
      expect(validationMsg.textContent.trim()).toEqual('Incorrect Email or Password.');
    }));
  });
});
