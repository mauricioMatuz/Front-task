import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DateComponent } from '../date/date.component';

export interface Value {
  from: number;
  to: number;
}
export interface Placeholder {
  from: string;
  to: string;
}
@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [ ReactiveFormsModule, DateComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useValue: forwardRef(() => DateRangeComponent),
      multi: true,
    },
  ],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.css',
})
export class DateRangeComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder!: Placeholder;
  @Output() changed = new EventEmitter<Value>();
  formDate!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formDate = this.fb.group({
      from: [null],
      to: [null],
    });
  }
  get min(): Date {
    const from = this.formDate.controls['from'].value;
    return from ? new Date(from) : new Date();
  }

  get max(): Date {
    const to = this.formDate.controls['to'].value;
    return to ? new Date(to) : new Date();
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  writeValue(value: Value): void {
    this.formDate.patchValue(value || {});
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formDate.disable();
    } else {
      this.formDate.enable();
    }
  }
  onChanged(): void {
    const value = { ...this.formDate.value };
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClosed(): void {
    this.propagateTouched();
  }
}
