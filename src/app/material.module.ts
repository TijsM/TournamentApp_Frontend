import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatTabsModule,
  MatTableModule,
  MatExpansionModule,
  MatIconModule,
  MatDividerModule,
  MatTooltipModule,
  MatSnackBarModule,
  MAT_DATE_LOCALE
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'nl-NL' }]
})
export class MaterialModule {}
