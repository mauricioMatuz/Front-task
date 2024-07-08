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
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { TaskService } from '../../services/task/task.service';
import { AlretsService } from '../../services/alert/alrets.service';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment.development';

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
  edit:boolean = false;
  showSpinner = true;
  private idTask!:string
  user: any[] = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private taskService: TaskService,
    private alerts: AlretsService,
    private router: Router,
    private actuveRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.generateForm();
    this.loadUserList();
    this.checkForEdit();
  }

  private checkForEdit(): void {
    const encryptedId = this.actuveRoute.snapshot.paramMap.get('encryptedId');
    if (encryptedId) {
      this.edit = true;
      const id = CryptoJS.AES.decrypt(encryptedId, environment.secret).toString(
        CryptoJS.enc.Utf8
      );
      this.idTask = id;
      this.taskService.Task(id).subscribe((task) => {
        this.formCreate.patchValue({
          title: task.title,
          description: task.description,
          userId: task.userId,
          deadline: task.deadline,
        });
      });
    }
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

  private loadTaskDetails(id: string) {
    console.log(id, ' esto es load');
    this.taskService.Task(id).subscribe(
      (response) => {
        console.log(response, 'task');
      },
      (error) => {
        console.log('ERROR: ' + error);
      }
    );
  }

  private crearTask() {
    console.log("QUE PASA MI NEGRI");
      const formValue = this.formCreate.value;
      formValue.deadline = new Date(formValue.deadline).toISOString();
    formValue.userId = parseInt(formValue.userId, 10);
    console.log(formValue," wat");
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
  }
  private editTask() {
    const formValue = this.formCreate.value;
    formValue.deadline = new Date(formValue.deadline).toISOString();
    formValue.userId = parseInt(formValue.userId, 10);
    console.log(this.idTask," esto mando ");
    this.taskService.Edit(this.idTask, formValue).subscribe(
      (response: any) => {
        this.showSpinner = false;
        this.alerts.MinShowSucces(
          'Tarea editada correctamente',
         'success',
          'Tarea editada',
          'center'
        );
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  submit() {
    if (this.formCreate.valid) {
      if (!this.edit) {
      this.crearTask()
      } else {
        this.editTask();
      }
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
