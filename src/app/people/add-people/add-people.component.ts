import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { API_ERROR_MESSAGE, ListPeopleComponent } from '../list-people/list-people.component';
import { Gender } from '../model/enums/gender';
import { Team } from '../model/enums/team';
import { PeoplesService } from '../peoples.service';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent{
  
  closeBtnName: string;  

  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder, private peopleService : PeoplesService, private alert: AlertModalService) {}  

  employeeForm = this.formBuilder.group({
    name: '',
    gender: 2,
    birthDate: '',
    email: '',
    startDate: '',
    cpf: '',
    team: 2
  });  

  teams = [
    {id: 0, name: Team[Team.Mobile]},
    {id: 1, name: Team[Team.Frontend]},
    {id: 2, name: Team[Team.Backend]}
  ]

  genders = [
    {id: 0, name: Gender[Gender.Male]},
    {id: 1, name: Gender[Gender.Female]},
    {id: 2, name: Gender[Gender.Other]},
  ]

  onSubmit(): void {  
    
    this.peopleService.registerPeople(this.employeeForm.value).subscribe(
      response => {
        this.modalRef.hide();
        this.alert.showAlertSuccess("The Employee has been successfull registered!");
        window.location.href = "/"               
      },
      error => {
        this.alert.showAlertDanger(API_ERROR_MESSAGE);
        console.log(error);
      }
    );
    
  }

}
