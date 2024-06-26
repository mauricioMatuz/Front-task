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
} from '../../components';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  isInline: boolean = false;
  regexError = regexErrors;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.generateForm()
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
    });
  }
}
