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
  ButtonComponent,
  AutocompleteComponent,
  NavbarComponent,
} from '../../components';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AlretsService } from '../../services/alert/alrets.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    PasswordComponent,
    RouterLink,
    RouterLinkActive,
    ButtonComponent,
    AutocompleteComponent,
    NavbarComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  isInline: boolean = false;
  regexError = regexErrors;
  rol: any[] = [];

  constructor(
    private fb: FormBuilder,
    private rolService: UserService,
    private userService: UserService,
    private alerts: AlretsService
  ) {}

  ngOnInit(): void {
    this.generateForm();
    this.getRol();
  }

  private generateForm(): void {
    this.formRegister = this.fb.group({
      name: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(4)],
        },
      ],
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
          validators: [Validators.required, Validators.pattern(regex.password)],
        },
      ],
      rolId: [null, [Validators.required]],
    });
  }

  registrar(): void {
    if (this.formRegister.valid) {
      // console.log('SI');
      this.userService
        .RegisterUser(this.formRegister.value)
        .subscribe((respose: any) => {
          this.alerts.MinShowSucces(
            'Registro exitoso',
            'success',
            'Te has registrado correctamente',
            'center'
          );
          this.formRegister.reset();
        });
    } else {
      console.log(this.formRegister.valid, '\n', this.formRegister.value);
      this.alerts.MinShowSucces(
        'No deje campos vacios',
        'warning',
        'CUIDADO',
        'center'
      );
    }
  }

  private getRol(): void {
    this.rolService.ListRol().subscribe((response) => {
      this.rol = response.map((roles: any) => ({
        value: roles.id,
        label: roles.rol,
      }));
    });
  }
}
