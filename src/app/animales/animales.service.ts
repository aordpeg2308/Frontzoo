import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Animal } from './interfaces/animal.interface';

@Injectable({ providedIn: 'root' })
export class AnimalesService {
  private baseURL: string = 'https://backendzoo.onrender.com/animales';

  constructor(private httpClient: HttpClient) {}

  getAnimales(): Observable<Animal[]> {
    return this.httpClient.get<{ data: Animal[] }>(`${this.baseURL}`).pipe(
      map(response => response.data)
    );
  }

  getAnimalById(id: string): Observable<Animal | undefined> {
    return this.httpClient.get<{ status: string, data: Animal }>(`${this.baseURL}/${id}`).pipe(
      catchError(error => of(undefined)),
      map(response => response?.data)
    );
  }

  getSuggestions(alimentacion: string, origen: string): Observable<Animal[]> {
    const url = `https://backendzoo.onrender.com/animales?q=${alimentacion}&alimentacion=${alimentacion}&origen=${origen}&_limit=6`;


    return this.httpClient.get<{ status: string, data: Animal[] }>(url)
      .pipe(
        map(response => response.data)
      );
  }

  addAnimal(animal: Animal): Observable<Animal> {
    return this.httpClient.post<Animal>(`${this.baseURL}`, animal);
  }

  updateAnimal(animal: Animal): Observable<Animal> {
    if (!animal.id) throw Error('El ID del animal es requerido');
    return this.httpClient.patch<Animal>(`${this.baseURL}/${animal.id}`, animal);
  }

  deleteAnimalById(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseURL}/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
