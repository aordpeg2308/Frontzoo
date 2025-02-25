import { Component, OnInit } from '@angular/core';
import { Animal } from '../../interfaces/animal.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalesService } from '../../animales.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
})
export class AnimalPageComponent implements OnInit {

  public animal?: Animal;

  constructor(
    private animalService: AnimalesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
     private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.animalService.getAnimalById(params['id']))
      )
      .subscribe({
        next: (animal) => {
          if (!animal) {

            this.router.navigate(['/animales/lista']);
            this.showSnackbar(`No hay ningun animal con ese id`);

          }
          this.animal = animal;
          console.log(animal);
        },
        error: (error) => {
          console.error('Error al cargar el animal', error);
          this.router.navigate(['/animales/lista']);
        }
      });
  }
  showSnackbar(message: string): void {
    this.matSnackBar.open(message, 'Vale', {
      duration: 2500,
    });
  }

  goList(): void {
    this.router.navigateByUrl('animales/lista');
  }
}
