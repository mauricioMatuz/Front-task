import { Component, OnInit } from '@angular/core';
import {
  ButtonComponent,
  FormFieldComponent,
  InputComponent,
  NavbarComponent,
  PasswordComponent,
} from '../../components';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-controltask',
  standalone: true,
  imports: [
    NavbarComponent,
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    PasswordComponent,
    RouterLink,
    RouterLinkActive,
    ButtonComponent,
  ],
  templateUrl: './controltask.component.html',
  styleUrl: './controltask.component.css',
})
export class ControltaskComponent implements OnInit {
  formCreate!: FormGroup;
  isInline: boolean = false;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.generateForm();
  }
  private generateForm(): void {
    this.formCreate = this.fb.group({
      titulo: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      descripcion: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
    });
  }
}
