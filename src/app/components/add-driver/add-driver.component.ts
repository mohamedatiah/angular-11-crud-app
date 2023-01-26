import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/Driver';
import { DriverService } from 'src/app/services/Driver.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {
  @ViewChild('driverForm') DriverForm?: NgForm;
  IsNew:boolean=true;
  id:any;
   drivers: Driver = {
     firstname: '',
     lastname: '',
     email: '',
     phone:0
     };
   submitted = false;
 
   constructor(private driverservice: DriverService,private activeRoute: ActivatedRoute,private router:Router) {
     activeRoute.params.subscribe(params => {
    this.id=params['id'];
    if(this.id){
    this.driverservice.get(this.id).subscribe(a=>{
      this.drivers=a;
    })
    }
    console.log(this.id);
    
     });
    }
 
   ngOnInit(): void {
   }
 
   savedrivers(): void {
     if(this.DriverForm?.valid){
     const data = {
       firstname: this.drivers.firstname,
       lastname: this.drivers.lastname,
       phone: this.drivers.phone,
       email: this.drivers.email,
     };
 
     this.driverservice.create(data)
       .subscribe(
         response => {
           console.log(response);
           this.submitted = true;
           this.router.navigate(['/drivers']);

         },
         error => {
           console.log(error);
         });
       }else{
         debugger;
         console.log(this.DriverForm);
         
       }
   }
   updatedrivers(){}
   newdrivers(): void {
     this.submitted = false;
 
   }
 
 }
 
