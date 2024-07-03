import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  FormFieldComponent,
  InputComponent,
  PasswordComponent,
  regex,
  regexErrors,
  ButtonComponent,
} from '../../components';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Login } from '../../models/backend/Login';
import { LoginService } from '../../services/login/login.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlretsService } from '../../services/alert/alrets.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    PasswordComponent,
    RouterLink,
    RouterLinkActive,
    ButtonComponent,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  isInline: boolean = false;
  regexError = regexErrors;
  @ViewChild('loginButton', { static: false }) loginButton!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private alert: AlretsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateForm();
  }

  private generateForm(): void {
    this.formLogin = this.fb.group({
      email: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.pattern(regex.email)],
        },
      ],
      password: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(regex.password),
          ],
        },
      ],
    });
  }

  onSubmit(): void {
    if (this.formLogin.valid) {
      this.login.Login(this.formLogin.value).subscribe((response) => {
        this.alert.MinShowSucces(
          'Bienvenido',
          'success',
          'Administra tus tareas'
        );
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.alert.MinShowSucces('Error', 'error', 'Verifica los campos','center');
    }
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.loginButton.nativeElement.click();
    }
  }
}
