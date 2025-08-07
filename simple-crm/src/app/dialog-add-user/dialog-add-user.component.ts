// dialog-add-user.component.ts
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

// Deutsches Datumsformat definieren
export const DE_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-add-user',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: MAT_DATE_FORMATS, useValue: DE_DATE_FORMATS }
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  
  // Datenmodell für den Benutzer
  user = {
    firstName: '',
    lastName: '',
    birthDate: null as Date | null,
    address: '',
    zipCode: '',
    city: ''
  };

  // Für das Input-Masking
  formatDateInput(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); // Nur Zahlen
    
    if (value.length >= 2) {
      value = value.substring(0, 2) + '.' + value.substring(2);
    }
    if (value.length >= 5) {
      value = value.substring(0, 5) + '.' + value.substring(5, 9);
    }
    
    event.target.value = value;
  }

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.user);
  }
}