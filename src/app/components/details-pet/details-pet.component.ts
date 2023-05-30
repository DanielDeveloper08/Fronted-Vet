import { Component, OnInit,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pet } from 'src/app/interfaces/pet.interface';

@Component({
  selector: 'app-details-pet',
  templateUrl: './details-pet.component.html',
  styleUrls: ['./details-pet.component.css']
})
export class DetailsPetComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public pet: Pet,
    public dialogRef: MatDialogRef<DetailsPetComponent>,
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.dialogRef.close();
  }


}
