import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //deposit - model
  depositForm = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

   //withdraw - model
   withdrawForm = this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  //acno to child
  acno:any

  aim = 'Your Perfect Banking Partner'

  lDate:any

  //login username
  user=""

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    if(localStorage.getItem('currentUsername')){
      //fetch username from local storage
      this.user=JSON.parse(localStorage.getItem('currentUsername') || '')
    }
    this.lDate= new Date()
   }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert('Please Log In')
      this.router.navigateByUrl('')
    }
  }

  //Deposit
  deposit(){

    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

    if(this.depositForm.valid){
      //deposit data service - asynchronous
     this.ds.deposit(acno,pswd,amount)
     .subscribe(
      (result:any)=>{
        alert(result.message)
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

  //WithDrawl
  withdraw(){

    var acno1 = this.withdrawForm.value.acno1
    var pswd1 = this.withdrawForm.value.pswd1
    var amount1 = this.withdrawForm.value.amount1

    if(this.withdrawForm.valid){
      this.ds.withdraw(acno1,pswd1,amount1)
      .subscribe(
        //200
        (result:any)=>{
          alert(result.message)
        },
        //400
        result=>{
          alert(result.error.message)
        }
      )   
    }

    else{
      alert('Invalid Form')
    }
    
  }

  //logout()
  logout(){
    //remove login acno . username
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUsername')
    localStorage.removeItem('token')
    //navigate to login page
    this.router.navigateByUrl('')
  }

  //deleteParent()
  deleteParent(){
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
  }

  //cancel() - to set acno as empty
  cancel(){
    this.acno=""
  }

  //onDelete($event)
  onDelete(event:any){
    //asynchronous
    this.ds.delete(event)
    .subscribe(
      (result:any)=>{
        alert(result.message)
        //navigate to login page
        this.router.navigateByUrl('')
      },
      result=>{
        alert(result.error.message)
      }
    )
  }

}
