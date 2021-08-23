import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { API_ERROR_MESSAGE } from '../list-people/list-people.component';
import { PeoplesService } from '../peoples.service';

@Component({
  selector: 'app-delete-people',
  templateUrl: './delete-people.component.html',
  styleUrls: ['./delete-people.component.css']
})
export class DeletePeopleComponent implements OnInit {

  @Input() employeeId: string;
  @Input() message: string;
  modalRef: BsModalRef;


  constructor(private peopleService: PeoplesService, private alert: AlertModalService, private routerService: Router) { }

  ngOnInit(): void {
  }

  confirm(): void {
    
    /*this.peopleService.removePeople(this.employeeId).subscribe(
      response =>{
        this.alert.showAlertSuccess('The user has been deleted.');
        this.modalRef.hide();
        this.routerService.navigateByUrl('/');
      },
      error => {
        this.alert.showAlertDanger(API_ERROR_MESSAGE);
      }
    ) */   
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

}
