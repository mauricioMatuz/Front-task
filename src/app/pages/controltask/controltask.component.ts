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
        if (this.formCreate) {
          this.formCreate.get('userId')?.setValue(null);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private generateForm(): void {
    this.formCreate = this.fb.group({
      title: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      description: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      userId: [null, [Validators.required]],
      deadline: [
        null,
        { updateOn: 'change', validators: [Validators.required] },
      ],
    });
  }

  submit() {
    if (this.formCreate.valid) {
      const formValue = this.formCreate.value;
      formValue.deadline = new Date(formValue.deadline).toISOString();
      formValue.userId = parseInt(formValue.userId, 10);
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
          this.user = [];
          this.loadUserList();
        },
        (error) => {
          console.log(error);
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
