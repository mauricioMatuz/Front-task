import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { ControlItem, Value } from '../../../../models/frontend';
export { ControlItem, Value } from '../../../../models/frontend';

import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatSelectModule, CommonModule, MatFormFieldModule, MatInputModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent implements ControlValueAccessor {
  @Input() items!: ControlItem[];
  @Input() placeHolder!: string;
  @Output() changed = new EventEmitter<Value>();

  value!: Value;
  isDisabled!: boolean;
  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  constructor() {}
  writeValue(value: Value): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  onChange(event: MatSelectChange): void {
    this.value = event.value ? event.value : null;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }
  onBlur(): void {
    this.propagateTouched();
  }
}
