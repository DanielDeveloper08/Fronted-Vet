import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
getPets(): Observable<Pet[]>{
  return this.http.get<Pet[]>(`${this.apiUrl}/api/Pet`);
}

}
