import { Injectable } from '@angular/core';

interface LanguageData {
  [key: string]: string;
}

interface Languages {
  [languageCode: string]: LanguageData;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private languages: Languages = {
    en: {
      'Identifiant': 'Username',
      'Mot de passe': 'Password',
      'Connexion': 'Login',
      'Inscrivez-vous': 'Sign Up',
      'Erreur de login ou de mot de passe': 'Login or password error',
      'Pas encore de compte?': 'Don\'t have an account?',
      'Nom d\'utilisateur': 'Username',
      'E-mail': 'Email',
      'S\'inscrire': 'Register',
      'Un nom d\'utilisateur est requis': 'Username is required',
      'Une adresse email valide est requise': 'A valid email is required',
      'Un mot de passe est requis': 'Password is required',
      'Erreur lors de l\'inscription. Vérifiez les champs.': 'Error during registration. Check the fields.',
      'Format d\'email invalide': 'Invalid email format',
      'Films Aimés': 'Liked Movies',
      'Films Vus': 'Watched Movies',
    },
    fr: {
      'Identifiant': 'Identifiant',
      'Mot de passe': 'Mot de passe',
      'Connexion': 'Connexion',
      'Inscrivez-vous': 'Inscrivez-vous',
      'Erreur de login ou de mot de passe': 'Erreur de login ou de mot de passe',
      'Pas encore de compte?': 'Pas encore de compte?',
      'Nom d\'utilisateur': 'Nom d\'utilisateur',
      'E-mail': 'E-mail',
      'S\'inscrire': 'S\'inscrire',
      'Un nom d\'utilisateur est requis': 'Un nom d\'utilisateur est requis',
      'Une adresse email valide est requise': 'Une adresse email valide est requise',
      'Un mot de passe est requis': 'Un mot de passe est requis',
      'Erreur lors de l\'inscription. Vérifiez les champs.': 'Erreur lors de l\'inscription. Vérifiez les champs.',
      'Format d\'email invalide': 'Format d\'email invalide',
      'Films Aimés': 'Films Aimés',
      'Films Vus': 'Films Vus',
    }
  };

  currentLanguage: string = 'fr';

  constructor() {
    this.loadLanguage();
  }

  loadLanguage() {
    this.currentLanguage = localStorage.getItem('language') || 'fr';
  }

  translate(key: string): string {
    const language = this.currentLanguage in this.languages ? this.currentLanguage : 'fr';
    const translations = this.languages[language];
    return key in translations ? translations[key] : "No translation found";
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'fr' : 'en';
    localStorage.setItem('language', this.currentLanguage);
    window.location.reload();
  }
}
