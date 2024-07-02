import { Component, OnInit } from '@angular/core';
import {
  AutocompleteComponent,
  ButtonComponent,
  DateComponent,
  FormFieldComponent,
  InputComponent,
  NavbarComponent,
  PasswordComponent,
  SpinnerComponent,
} from '../../components';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { TaskService } from '../../services/task/task.service';
import { AlretsService } from '../../services/alert/alrets.service';

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
    AutocompleteComponent,
    SpinnerComponent,
    DateComponent,
  ],
  templateUrl: './controltask.component.html',
  styleUrl: './controltask.component.css',
})
export class ControltaskComponent implements OnInit {
  formCreate!: FormGroup;
  isInline: boolean = false;
  showSpinner = true;
  user: any[] = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private taskService: TaskService,
    private alerts: AlretsService
  ) {}
  ngOnInit(): void {
    this.generateForm();
    this.loadUserList();
  }

  private loadUserList() {
    this.userService.LisUser().subscribe(
      (response) => {
        this.user = response.map((users: any) => ({
          value: users.id.toString(),
          label: users.name,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
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
      autocomplete: [null, [Validators.required]],
      date: [null, { updateOn: 'change', validators: [Validators.required] }],
    });
     this.formCreate.get('date')?.valueChanges.subscribe((value) => {
       if (value) {
         const date = new Date(value);
         console.log(date); // Muestra la fecha correspondiente en la consola
       }
     });
  }
  submit() {
    console.log(this.formCreate.valid, this.formCreate.value);
    if (this.formCreate.valid) {
      console.log('SI');
      console.log(this.formCreate.value);
       const formValue = {
         ...this.formCreate.value,
         date: new Date(this.formCreate.value.date),
       };
      this.taskService.CrateTask(formValue).subscribe(
        (response: any) => {
          this.showSpinner = false;
          this.alerts.MinShowSucces(
            'Tarea creada correctamente',
            'success',
            'Tarea creada',
            'center'
          );
          this.formCreate.reset();
        },
        (error) => {
          console.log(error, ' que pedo');
        }
      );
    } else {
      this.alerts.MinShowSucces(
        'No deje campos vacios',
        'warning',
        'CUIDADO',
        'center'
      );
    }
  }
}
