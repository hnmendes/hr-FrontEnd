import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Gender } from '../model/enums/gender';
import { Team } from '../model/enums/team';
import { People } from '../model/people';
import { PeoplesService } from '../peoples.service';
import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-edit-people',
  templateUrl: './edit-people.component.html',
  styleUrls: ['./edit-people.component.css']
})
export class EditPeopleComponent implements OnInit {  
  
  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder, private peopleService : PeoplesService, private alert:AlertModalService) { }

  @Input() list: any[] = [];
  employee: People;

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

  employeeForm = this.formBuilder.group({
    id: '',
    name: '',
    gender: 2,
    birthDate: '',
    email: '',
    startDate: '',
    cpf: '',
    team: 2
  });  

  ngOnInit(): void {        

    this.peopleService.getPeopleById(this.list[0].employeeId)
      .subscribe(
        people => {    
          
          this.employee = people;
          
          this.employeeForm.patchValue({
            id: people.id,
            name: people.name,
            gender: people.gender,
            birthDate: new Date(people.birthDate),
            email: people.email,
            startDate: new Date(people.startDate),
            cpf: people.cpf,
            team: people.team
          });
        },
        error => console.log(error)
      );
  }

  onSubmit(): void {
    this.peopleService.editPeople(this.employeeForm.value).subscribe(
      response => {        
        this.alert.showAlertSuccess("The Employee has been successfull updated!");
        window.location.href = "/"
      }
    );
  }

  get gender() {
    return this.employeeForm.get('gender').value;
  }

  get team() {
    return this.employeeForm.get('team').value;
  }
}
