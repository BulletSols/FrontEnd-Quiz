import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import {MatCommonModule, MatOption} from "@angular/material/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./header/header.component";
import {MatTabHeader} from "@angular/material/tabs";
import {MatHeaderRow} from "@angular/material/table";
import {MatSelect} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCommonModule,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatPaginator,
    MatInput,
    MatButton,
    MatLabel,
    MatFormField,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatTabHeader,
    MatHeaderRow,
    MatSelect,
    MatOption,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
