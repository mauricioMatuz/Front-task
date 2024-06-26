import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  forwardRef,
  Output,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  takeUntil,
  distinctUntilChanged,
  startWith,
  map,
  filter,
} from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ControlItem, Value } from '../select/select.component';
export { ControlItem, Value } from '../select/select.component';
import { Subject, Observable } from 'rxjs';
import { HighlightPipe } from './pipe/highlight.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    HighlightPipe,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() items!: ControlItem[];
  @Input() placeholder!: string;
  @Output() changed = new EventEmitter<Value>();

  formControl = new FormControl();

  options$!: Observable<ControlItem[]>;

  private destroy = new Subject<any>();
  constructor() {}
  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''), // Comienza con un valor vacío ('')
      filter((value) => typeof value === 'string' || typeof value === 'object'), // Filtra valores que son strings u objetos
      map((value) => (typeof value === 'string' ? value : value.label)), // Si el valor es un string, lo deja tal cual; si es un objeto, toma su propiedad 'label'
      map((label) => (label ? this.filter(label) : this.items.slice())) // Filtra los elementos según el label o devuelve todos los items si el label está vacío
    );
  }
  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
  private filter(value: string): ControlItem[] {
    const filterValue = value.toLowerCase();
    return this.items.filter((items) =>
      items.label.toLowerCase().includes(filterValue)
    );
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};
  writeValue(value: Value): void {
    const selectedOption = this.items.find((item) => item.value === value);
    this.formControl.setValue(selectedOption);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  displayFn(item?: ControlItem): string {
    console.log(item," que epdo xd");
    return item ? item.label : '';
  }
  onBlur(): void {
    this.propagateTouched();
  }
}
