import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pet } from '../interfaces/pet.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Servicio que retorna todas las mascotas
   * @returns Arreglo de mascotas
   */
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/api/Pet`);
  }

  /**
   * Servicio que busca mascota por  id
   * @param idPet id de la mascota
   * @returns Objeto de tipo mascota
   */
  getPetById(idPet: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/api/Pet/${idPet}`);
  }

  /**
  * Servicio que eliminar mascota por  id
  * @param idPet id de la mascota
  * @returns Objeto de tipo mascota
  */
  deletePet(idPet: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/Pet/${idPet}`);
  }



  /**
  * Servicio que agregar una mascota
   * @param pet 
   * @returns 
   */
  addMascota(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiUrl}/api/Pet`, pet);
  }

  /**
   * Servicio para editar una mascota
    * @param pet 
    * @returns 
    */
  editPet(id: number, pet: Pet): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/api/Pet/${id}`, pet);
  }


}
