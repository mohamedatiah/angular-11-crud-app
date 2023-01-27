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
      id:'',
     firstname: '',
     lastname: '',
     email: '',
     phoneNumber:''
     };
   submitted = false;
 
   constructor(private driverservice: DriverService,private activeRoute: ActivatedRoute,private router:Router) {
     activeRoute.params.subscribe(params => {
    this.id=params['id'];
    if(this.id){
      console.log(this.id);
      
     this.IsNew=false;
    this.driverservice.get(this.id).subscribe(a=>{
      if(a.IsSuccess){
      this.drivers=a.Result||new Driver();
      this.id=a.Result?.id;
      }
    })
    }
    console.log(this.id);
    
     });
    }
 
   ngOnInit(): void {
   }
 
   savedrivers(): void {
    console.log(this.DriverForm?.form.value);
    
     if(this.DriverForm?.valid){
      if(this.id){
     this.driverservice.create(this.DriverForm.value)
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
          //update
          this.driverservice.update(this.id,this.DriverForm.value)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
              this.router.navigate(['/drivers']);
   
            },
            error => {
              console.log(error);
            });
        }
        }else{
         console.log(this.DriverForm);
         
       }
   }
   updatedrivers(){}
   newdrivers(): void {
     this.submitted = false;
 
   }
 
 }
 
