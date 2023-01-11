import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Salarie } from 'src/app/models/salarie';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-salarie-modal',
  templateUrl: './register-salarie-modal.component.html',
  styleUrls: ['./register-salarie-modal.component.scss']
})
export class RegisterSalarieModalComponent implements OnInit {

  registerSalarie !: FormGroup<any>
  salarie = new Salarie()


  maxDate = new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate())

  civilites = [{
    title1: "Monsieur",
    title2: "Madame"
  }]

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required)

  constructor(
    private _fb: FormBuilder,
    private _salarieService: UsersService,
    private _router: Router,
    private _dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {

    this.registerSalarie = this._fb.group({

      civilite: [this.salarie.civilite, Validators.required],
      nom: [this.salarie.nom, Validators.required],
      prenom: [this.salarie.prenom, Validators.required],
      telephone: [this.salarie.telephone, Validators.required],
      rue: [this.salarie.rue, Validators.required],
      cp: [this.salarie.rue, Validators.required],
      ville: [this.salarie.ville, Validators.required],
      email: [this.salarie.email, [Validators.email, Validators.required]],
      mdp: [this.salarie.mdp, [Validators.minLength(8), Validators.maxLength(12)]],
      nom_jeune_fille: this.salarie.nom_jeune_fille,
      num_ss: [this.salarie.num_ss, Validators.required],
      date_naissance: [this.salarie.date_naissance, Validators.required],
      lieu_naissance: [this.salarie.lieu_naissance, Validators.required],
      pays_naissance: [this.salarie.pays_naissance, Validators.required]


    })

  }

  onSubmit(): void {
    const formulaire = this.registerSalarie.value
    this.salarie = Object.assign(this.salarie, formulaire)

    this._salarieService.registerSalarie(this.salarie).subscribe((reponse: any) => {

      let token = reponse.token
      let role = reponse.registerAWorker.role

      this._salarieService.setToken(token)
      this._salarieService.setRole(role)

    })
    this._dialogRef.close()

  }

  // ** méthode message erreur envoyé */
  getErrorMessageMail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not matching passwords' : '';
  }


}
