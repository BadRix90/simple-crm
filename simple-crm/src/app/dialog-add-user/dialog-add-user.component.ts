import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  user = new User();
  birthDate: Date | null = null;  // Für den Datepicker
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSave(): Promise<void> {
    // Datum vom Datepicker in User-Objekt übertragen
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }
    
    console.log('Saving user:', this.user);
    
    try {
      // User zu Firebase Firestore hinzufügen - direkt das Objekt verwenden
      const usersCollection = collection(this.firestore, 'users');
      const docRef = await addDoc(usersCollection, {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        birthDate: this.user.birthDate,
        address: this.user.address,
        zipCode: this.user.zipCode,
        city: this.user.city
      });
      console.log('User saved with ID:', docRef.id);
      
      this.dialogRef.close(this.user);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }
}