import { Component, OnInit } from '@angular/core';

import { User, UserService } from './user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  ready = false;
  user: User[];

  myForm: FormGroup;


  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(user => {
      this.user = user;
      this.ready = true;
    });

    this.myForm.valueChanges.subscribe(console.log)

    const address = this.fb.group({
      address: [],
      city: [],
      state: [],
      zip: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ]]
    })
    this.myForm = this.fb.group({
      name: '',
      email: ['',[
        Validators.required,
        Validators.email
      ]],
      homeAddress: address
    })
  }
  
  get email(){
    return this.myForm.get('email');
  }
  get zip(){
      return this.myForm.get('zip');
  }
}
