import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Firebase config direkt hier - KEINE environments!
const firebaseConfig = {
  apiKey: "AIzaSyBJ0PSZqz_ezicpLMy9WaxC8BigpFfIuY0",
  authDomain: "simple-crm-9127b.firebaseapp.com",
  projectId: "simple-crm-9127b",
  storageBucket: "simple-crm-9127b.firebasestorage.app",
  messagingSenderId: "873527943529",
  appId: "1:873527943529:web:fc8ac75fd6adb86361ddf8"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideNativeDateAdapter(),
    
    // Firebase providers
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};