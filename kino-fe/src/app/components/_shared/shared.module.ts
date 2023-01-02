import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInfoComponent } from './date-info/date-info.component';
import { UpperTabComponent } from './upper-tab/upper-tab.component';

@NgModule({
  declarations: [
    DateInfoComponent,
    UpperTabComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  exports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    DateInfoComponent,
    UpperTabComponent
  ]
})
export class SharedModule { }
