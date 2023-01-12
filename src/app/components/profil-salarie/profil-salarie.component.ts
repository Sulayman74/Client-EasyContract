import { Component, Input, OnInit } from '@angular/core';

import { EditModalComponent } from 'src/app/modals/edit-modal/edit-modal.component';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profil-salarie',
  templateUrl: './profil-salarie.component.html',
  styleUrls: ['./profil-salarie.component.scss']
})
export class ProfilSalarieComponent implements OnInit {


  @Input() profilSalarie!: any

  constructor(
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  onEdit() {
    let dialogRef = this._dialog.open(EditModalComponent, {
      width: "100%",
      height: "100%",
      data: this.profilSalarie
    })
    dialogRef.afterClosed().subscribe((profil: any) => {
      this.profilSalarie = profil.profil.newDatas

    })



  }

}