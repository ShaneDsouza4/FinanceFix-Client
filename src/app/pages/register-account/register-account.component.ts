import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent {

  accountForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  constructor(
    private _userService: UserService,
    private router: Router
  ) { }

  createAccount() {
    this._userService.addUser(this.accountForm.value.name);
    this.router.navigateByUrl('')
  }

}
