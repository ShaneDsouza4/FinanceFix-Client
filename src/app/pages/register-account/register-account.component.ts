import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent {

  accountForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  createAccount() {

  }

}
