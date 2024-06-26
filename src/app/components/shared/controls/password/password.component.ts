import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type PasswordType = 'password' | 'text';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
})
export class PasswordComponent implements ControlValueAccessor {
  @Input() placeHolder!: string;
  @Input() customClasses: string = '';
  @Output() changed = new EventEmitter<string>();

  value!: string;
  isDisabled!: boolean;
  icon:boolean = true;
  passwordType!: PasswordType;
  constructor() {
    this.passwordType = 'password';
  }

  private propagateChange: any = () => {};
  private propageteTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propageteTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyUp(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void {
    this.propageteTouched();
  }

  togglePassword(): void {
    this.icon =!this.icon;
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
