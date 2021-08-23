import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertTypes } from '../shared/alert-modal.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @Input() type = AlertTypes.INFO;
  @Input() message: string;
  timeout:number = 5000;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClosed(){
    this.bsModalRef.hide();
  }

}
