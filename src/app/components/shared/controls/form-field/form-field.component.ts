import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css',
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() required!: boolean;
  @Input() isInline!: boolean; // Aquí se declara la propiedad isInline
  @Input() control!: AbstractControl;
  @Input() patternError!: string
  constructor() {
    // this.required = false;
    this.isInline = true;
  }

  hasError(): boolean {
    return this.control && this.control.invalid && this.control.touched;
  }
  get errorKey() {
    return (
      this.control && this.control.errors && Object.keys(this.control.errors)[0]
    );
  }
}
