import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Animal } from '../../interfaces/animal.interface';
import { AnimalesService } from '../../animales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: []
})
export class NewPageComponent implements OnInit {

  public animalForm = new FormGroup({
    id: new FormControl<string>(''),
    nombre: new FormControl<string>('', { nonNullable: true }),
    nombreCientifico: new FormControl<string>(''),
    alimentacion: new FormControl<string>(''),
    origen: new FormControl<string>(''),
    foto: new FormControl<string>(''),
  });
  snackbar: any;

  constructor(
    private animalsService: AnimalesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.animalsService.getAnimalById(id))

      ).subscribe(animal => {
        if (!animal) return this.router.navigateByUrl('/');

        this.animalForm.reset(animal);

        return;
      })
  }

  get currentAnimal(): Animal {
    const animal = this.animalForm.value as Animal;
    return animal;
  }

  onSubmit(): void {
    if (this.animalForm.invalid) return;

    if (this.currentAnimal.id) {
      this.animalsService.updateAnimal(this.currentAnimal)
        .subscribe(animal => {
          this.showSnackbar(`¡Animal actualizado Correctamente!`)
          this.router.navigate(['/animales/lista']);
        });
      return;
    }

    this.animalsService.addAnimal(this.currentAnimal)
      .subscribe(animal => {
        this.showSnackbar(`¡Nuevo animal creado!`);
        this.router.navigate(['/animales/lista']);

      });
  }

  showSnackbar(message: string): void {
    this.matSnackBar.open(message, 'Vale', {
      duration: 2500,
    });
  }

  onDeleteAnimal(): void {
    if (!this.currentAnimal.id) throw Error('Eliminar Animal');


    this.animalsService.deleteAnimalById(this.currentAnimal.id)
      .subscribe(wasDeleted => {
        if (wasDeleted) this.router.navigate(['/animales']);
      });
  }
}
