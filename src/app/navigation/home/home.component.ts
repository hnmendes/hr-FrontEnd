import { Component, OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddPeopleComponent } from 'src/app/people/add-people/add-people.component';
import { People } from 'src/app/people/model/people';
import { PeoplesService } from 'src/app/people/peoples.service';
import { Team } from 'src/app/people/model/enums/team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{  

  constructor(private modalService: BsModalService, private peopleService: PeoplesService) { }

  public modalRef: BsModalRef;
  public peoples: People[];
  public team: Team;
  
  ngOnInit(){    
    
    this.peopleService.getPeoples()
      .subscribe(
        peoples => {
          this.peoples = peoples;          
        },
        error => console.log(error)
      );
  }

  getTeamAsString(team: Team): string{
    return Team[team];
  }

  formatStartDate(date) : string{    
    
    let dateObj = new Date(date);
    
    return dateObj.getMonth() + "/" + dateObj.getFullYear();
  }
  
  openModalWithComponent() {

    this.modalRef = this.modalService.show(AddPeopleComponent);
    this.modalRef.content.closeBtnName = 'Close';
  }
  
}