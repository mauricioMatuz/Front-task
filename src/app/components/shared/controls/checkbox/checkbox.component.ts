import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { ControlItem, Value } from '../select/select.component';
export { ControlItem, Value } from '../select/select.component';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
})
export class CheckboxComponent implements ControlValueAccessor {
  value!: Value[];
  isDisabled!: boolean;
  @Input() items!: ControlItem[];
  @Output() changed = new EventEmitter<Value[]>();
  constructor() {}

  private propageteChanged: any = () => {};
  private propageteTouched: any = () => {};

  writeValue(value: Value[]): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propageteChanged = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(value: Value, checked: Event): void {
    const target = checked.target as HTMLInputElement;
    const selected = this.getSelected(value, target.checked);
    this.value = selected;
    this.propageteChanged(this.value);
    this.changed.emit(this.value);
  }

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.value ? [...this.value] : [];
    if (checked) {
      if (!selected.includes(value)) {
        selected.push(value);
      }
    } else {
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }
    return selected.length ? selected : [];
  }
  isChecked(value: Value): boolean {
    return this.value && this.value.includes(value);
  }
  onBlur(): void {
    this.propageteTouched();
  }
}
