import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pet } from 'src/app/interfaces/pet.interface';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.css']
})
export class AddEditPetComponent implements OnInit {

  isLoading: boolean = false;
  idEditPet!: string;

  form!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _petService: PetService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idEditPet = this.route.snapshot.paramMap.get('id')!;
    this.createForm();
    this.idEditPet ? this.getPetById(this.idEditPet) : null;
  }

  /**
   * Crea el formulario de la mascota.
   */
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      breed: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required],
    })
  }

  /**
   * Redirige a la lista de mascotas
   */
  goToList() {
    this.router.navigateByUrl('/list-pet');
  }

  /**
   * Prepara la data a ser guardada o editada.
   */
  submitData() {
    const pet: Pet = {
      name: this.form.value.name,
      age: this.form.value.age,
      breed: this.form.value.breed,
      color: this.form.value.color,
      weight: this.form.value.weight
    }

    this.idEditPet
      ? this.editPet(pet)
      : this.savePet(pet)
  }

  /**
   * Guarda una mascota.
   * @param pet 
   */
  savePet(pet: Pet){
    this._petService
        .addMascota(pet)
        .subscribe(data => {
          this.toastr.success("Mascota registrada exitosamente", "Mensaje")
          this.router.navigateByUrl('/list-pet');
        })
  }


  /**
   * Actualiza una mascota.
   * @param idPet 
   * @param pet 
   */
  editPet(pet:Pet){
    pet.id = Number(this.idEditPet);
    this._petService
      .editPet(Number(this.idEditPet), pet)
      .subscribe(data => {
        this.toastr.success("Mascota actualizada exitosamente", "Mensaje")
        this.router.navigateByUrl('/list-pet');
      })
  }

  /**
 * Obtiene las mascotas por id
 */
  getPetById(idPet: string) {
    this.isLoading = true;
    this._petService.getPetById(Number(idPet)).subscribe(
      {
        next: (data: Pet) => {
          this.isLoading = false;
          this.setData(data);
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error("Ocurrió un error! Comuníquese con el administrador!")
        },
      }
    );
  }

  /**
   * Setea la data del formulario
   * @param pet 
   */
  setData(pet: Pet) {
    this.form.patchValue(pet);
  }

}
