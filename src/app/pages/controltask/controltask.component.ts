import { Component, OnInit } from '@angular/core';
import {
  AutocompleteComponent,
  ButtonComponent,
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
  ],
  templateUrl: './controltask.component.html',
  styleUrl: './controltask.component.css',
})
export class ControltaskComponent implements OnInit {
  formCreate!: FormGroup;
  isInline: boolean = false;
  showSpinner = true;
  user: any[] = [];
  constructor(private fb: FormBuilder, private userService: UserService,private taskService:TaskService,private alerts:AlretsService) {}
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
    });
  }
  submit() {
    if(this.formCreate.valid){
      this.taskService.CrateTask(this.formCreate.value)
    } else {
      this.alerts.MinShowSucces("No deje campos vacios","question")
   }
  }
}
