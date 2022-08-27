import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  aim = 'Your Perfect Banking Partner'

  //login Acno
  acno:any
  //to hold transation array
  transaction:any

  constructor(private ds:DataService) {
    //get login acno from data service
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')

    //get transaction array from data service - asynchronous
   this.ds.getTransaction(this.acno)
   .subscribe(
    (result:any)=>{
      this.transaction = result.transaction
    },
    result=>{
      alert(result.error.message)
    }
  )   
    
   }

  ngOnInit(): void {
  }

}
