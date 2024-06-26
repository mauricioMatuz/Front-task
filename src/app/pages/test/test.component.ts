import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonComponent } from '../../components/shared/buttons/button/button.component';
import { InputComponent } from '../../components/shared/controls/input/input.component';
import { CardComponent, FormFieldComponent, regex, regexErrors } from '../../components/shared';
import { PasswordComponent } from '../../components/shared/controls/password/password.component';
import { SelectComponent } from '../../components/shared/controls/select/select.component';
import { ControlItem } from '../../components/shared/controls/select/select.component';
import { CheckboxComponent } from '../../components/shared/controls/checkbox/checkbox.component';
import { RadioComponent } from '../../components/shared/controls/radio/radio.component';
import { DateComponent } from '../../components/shared/controls/date/date.component';
import { DateRangeComponent } from '../../components/shared/controls/date-range/date-range.component';
import { AutocompleteComponent } from '../../components/shared/controls/autocomplete/autocomplete.component';
import { NotificationService } from '../../services/notification.service';
import { SpinnerComponent } from '../../components/shared/indicators/spinner/spinner.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    PasswordComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
    DateComponent,
    DateRangeComponent,
    AutocompleteComponent,
    SpinnerComponent,
    CardComponent,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  formTest!: FormGroup;
  isInline!: boolean;
  regexError = regexErrors;
  showSpinner = false;
  items!: ControlItem[];
  constructor(
    private fb: FormBuilder,
    private notification: NotificationService
  ) {
    this.isInline = true;
    this.items = [
      { label: 'Test', value: 'valie1', icon: null },
      { label: 'Test2', value: 'valie2', icon: null },
      { label: 'Test3', value: 'valie3', icon: null },
    ];
  }
  ngOnInit(): void {
    this.formTest = this.fb.group({
      name: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern(regex.number),
          ],
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
      select: [
        null,
        { updateOn: 'changed', validators: [Validators.required] },
      ],
      checkbox: [
        null,
        { updateOn: 'changed', validators: [Validators.required] },
      ],
      radio: [null, { updateOn: 'changed', validators: [Validators.required] }],
      date: [null, { updateOn: 'changed', validators: [Validators.required] }],
      dateRange: [
        null,
        { updateOn: 'change', validators: [Validators.required] },
      ],
      autocomplete: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
    });
  } //

  onPatchValue() {
    this.formTest.patchValue({
      name: 'Mau jalo',
    });
  }
  onSubmit(): void {}
  orgonizarElemento() {
    this.isInline = !this.isInline;
  }
  onToggleDisabled() {
    if (this.formTest.enabled) {
      this.formTest.disable();
    } else {
      this.formTest.enable();
    }
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  onSuccess(): void {
    this.notification.success('El procedimiento fue exitoso');
  }

  onError(): void {
    this.notification.error('Se encontraron errores en el proceso');
  }

  onFilesChanged(urls: string | string[]): void {
    console.log('urls', urls);
  }
}
