import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // properties / variable
  aim = 'Your Perfect Banking Partner'

  account = 'Please Enter Account Number Here'

  acno=""
  pswd=""

   //login - model
   loginForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  // constructor - 
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  // life cycle hook - angular
  ngOnInit(): void {
  }

  // login
  login(){
    var acno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd

    if(this.loginForm.valid){
      //calling login - dataservice - asynchronous
    this.ds.login(acno,pswd)
    .subscribe(
      (result:any)=>{
        localStorage.setItem('currentUsername',JSON.stringify(result.currentUsername))
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
        localStorage.setItem('token',JSON.stringify(result.token))
        alert('Login Successful')
      this.router.navigateByUrl('dashboard')
      },
      result=>{
        alert(result.error.message)
      }
    )   
    }
    else{
      alert('Invalid Form')
    }
    }  

}
