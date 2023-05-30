import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from 'src/app/interfaces/pet.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailsPetComponent } from '../details-pet/details-pet.component';
import { ToastrService } from 'ngx-toastr';
import { PetService } from 'src/app/services/pet.service';


@Component({
  selector: 'app-list-pet',
  templateUrl: './list-pet.component.html',
  styleUrls: ['./list-pet.component.css']
})
export class ListPetComponent implements OnInit  {

  displayedColumns: string[] = ['id', 'name', 'age', 'breed', 'color', 'weight','actions'];
  dataSource = new MatTableDataSource<Pet>([]);
  isLoading: boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _petService: PetService
  ) { }

  ngOnInit() {
    this.getPets();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails(item: Pet){
    this.dialog.open( DetailsPetComponent,{
      data: item,
      disableClose: true,
      hasBackdrop: true,
      width: "400px",
    })
  }

  deletePet(item: Pet){
    this.toastr.success("Mascota eliminada exitosamente!","Mensaje",{progressAnimation:'decreasing',progressBar:true})
  }

  /**
   * Llamada al servicio que retorna todas las mascotas
   */
  getPets(){

    this.isLoading = true;

    this._petService.getPets().subscribe({
      next: (dataPets: Pet[]) => {
        this.isLoading = false;
        this.dataSource.data = dataPets;
        this.setPaginationOrder();
      },
      error: (error) => {
        this.isLoading = false;
        this.toastr.error("Ocurrió un error! Comuníquese con el administrador!")
      }
    });
  }

 /**
  * Establece la paginacion y el ordenamiento
  */
  setPaginationOrder(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Items por página: "
  }

}
