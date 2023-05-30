import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.css']
})
export class AddEditPetComponent implements OnInit {

  isLoading: boolean = false;


  form!: FormGroup;
  constructor(
    private router:Router,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      name:   ['', Validators.required],
      age:    ['', Validators.required],
      breek:  ['', Validators.required],
      color:  ['', Validators.required],
      weight: ['', Validators.required],
    })
  }

  goToList(){
    this.router.navigateByUrl('/list-pet');
  }

  submitData(){
    console.log(this.form)
  }

}
