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
  selector: 'app-radio',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
})
export class RadioComponent implements ControlValueAccessor {
  value!: Value;
  isDisabled!: boolean;
  @Input() items!: ControlItem[];
  @Output() changed = new EventEmitter<Value>();
  constructor() {}
  private propagateChange: any = () => {};
  // private propageteTouced: any = () => {};

  writeValue(value: Value): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(value: Value) {
    console.log("VALOR DEL RADIO ",value);
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  isChecked(value: Value): boolean {
    return this.value === value;
  }


}
