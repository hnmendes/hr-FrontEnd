import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddPeopleComponent } from 'src/app/people/add-people/add-people.component';
import { People } from 'src/app/people/model/people';
import { PeoplesService } from 'src/app/people/peoples.service';
import { Team } from 'src/app/people/model/enums/team';
import { EditPeopleComponent } from '../edit-people/edit-people.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { combineLatest, Subscription } from 'rxjs';

export const API_ERROR_MESSAGE = "Error: A connection error occurred. Please connect the API or check what is wrong."

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements OnInit {

  constructor(private modalService: BsModalService, private peopleService: PeoplesService, private alert:AlertModalService, private changeDetection: ChangeDetectorRef) { }

  public modalRef: BsModalRef;
  public peoples: People[];
  public team: Team;
  events: Subscription[] = [];
  connectionError: boolean = false;
  
  ngOnInit(){    
    
    this.peopleService.getPeoples()
      .subscribe(
        peoples => {
          this.peoples = peoples;          
        },
        error => {
          this.alert.showAlertDanger(API_ERROR_MESSAGE);
          this.connectionError = true;
          console.log(error);
        }
      );
  }

  getTeamAsString(team: Team): string{
    return Team[team];
  }

  formatStartDate(date) : string{    
    
    let dateObj = new Date(date);
    
    return dateObj.getMonth() + "/" + dateObj.getFullYear();
  }
  
  openModalRegisterEmployee() {
    
    if(this.connectionError){
      this.alert.showAlertDanger(API_ERROR_MESSAGE);
    }else{
      
      const _combine = combineLatest(      
        this.modalService.onHidden
      ).subscribe(() => this.changeDetection.markForCheck());
  
      this.events.push(
        this.modalService.onHidden.subscribe(() => {                
          this.ngOnInit();      
          this.unsubscribe();
        })
      );
  
      this.events.push(_combine);
      this.modalRef = this.modalService.show(AddPeopleComponent);
      this.modalRef.content.closeBtnName = 'Close';
    }    
  }

  openModalEditEmployee(id: string){                    

    const _combine = combineLatest(      
      this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());

    this.events.push(
      this.modalService.onHidden.subscribe(() => {                
        this.ngOnInit();      
        this.unsubscribe();
      })
    );

    this.events.push(_combine);
    
    const initialState = {      
      list : [
        { employeeId: id }
      ]
    }    

    this.modalRef = this.modalService.show(EditPeopleComponent, {initialState});
    this.modalRef.content.closeBtnName = 'Close';
    
  }

  openModalDeleteEmployee(template:TemplateRef<any>){        
    
    const _combine = combineLatest(      
      this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());

    this.events.push(
      this.modalService.onHidden.subscribe(() => {                
        this.ngOnInit();      
        this.unsubscribe();
      })
    );

    this.events.push(_combine);

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(people: People): void {
    
    this.peopleService.removePeople(people).subscribe(
      response =>{
        this.alert.showAlertSuccess('The user has been deleted.');
        this.modalRef.hide();
        setTimeout(window.location.href = '/' , 3000);
      },
      error => {
        this.alert.showAlertDanger(API_ERROR_MESSAGE);
      }
    )    
  }
 
  decline(): void {    
    this.modalRef.hide();
  }

  unsubscribe() {
    this.events.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.events = [];
  }

}
