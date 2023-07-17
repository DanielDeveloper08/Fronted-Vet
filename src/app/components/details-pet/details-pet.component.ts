import { Component, OnInit,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Pet } from 'src/app/interfaces/pet.interface';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-details-pet',
  templateUrl: './details-pet.component.html',
  styleUrls: ['./details-pet.component.css']
})
export class DetailsPetComponent implements OnInit {

  dataPet!: Pet;
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public idPet: number,
    public dialogRef: MatDialogRef<DetailsPetComponent>,
    private _petService: PetService,
    private toastr: ToastrService,
  ) { }
  
  /**
   * NgOnInit
   */
  ngOnInit() {
    this.getPetById();
  }

  /**
   * Obtiene las mascotas por id
   */
  getPetById(){
    this.isLoading = true;
    this._petService.getPetById(this.idPet).subscribe(
      {
        next: (data:Pet)=>{
          this.isLoading = false;
          this.dataPet = data;
        },
        error: (error)=>{
          this.isLoading = false;
          this.toastr.error("Ocurrió un error! Comuníquese con el administrador!")
        },
      }
    );
  }

  /**
   * Cierra el modal
   */
  closeModal(){
    this.dialogRef.close();
  }


}
