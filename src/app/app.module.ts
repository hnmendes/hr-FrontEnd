import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { AddPeopleComponent } from './people/add-people/add-people.component';
import { EditPeopleComponent } from './people/edit-people/edit-people.component';
import { DeletePeopleComponent } from './people/delete-people/delete-people.component';
import { ListPeopleComponent } from './people/list-people/list-people.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { rootRouterConfig } from './app.routes';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { HomeComponent } from './navigation/home/home.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPeopleComponent,
    EditPeopleComponent,
    DeletePeopleComponent, 
    ListPeopleComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    AlertModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    [RouterModule.forRoot(rootRouterConfig, {useHash: false}),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
  ]
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
