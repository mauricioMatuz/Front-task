import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CardComponent,
  FormFieldComponent,
  InputComponent,
  PasswordComponent,
  regex,
  regexErrors,
  ButtonComponent
} from '../../components';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Login } from '../../models/backend/Login';
import { LoginService } from '../../services/login/login.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

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
    AsyncPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  isInline: boolean = false;
  regexError = regexErrors;
  holderEmail: string = 'Ingrese su correo';
  pokemonList$!: Observable<any>;
  constructor(private fb: FormBuilder, private login: LoginService) {}

  ngOnInit(): void {
    this.generateForm();
    this.pokemonList$ = this.login.Pokemon()
    console.log(this.pokemonList$," OMG");

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
      const login: Login = this.formLogin.value;
      console.log('LOGIN xd', login);
      this.login.Login(login);
    }
  }
}
