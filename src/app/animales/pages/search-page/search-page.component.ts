import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Animal } from '../../interfaces/animal.interface';
import { AnimalesService } from '../../animales.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  public selectedAnimal?: Animal;
  public alimentacionInput = new FormControl('');
  public origenInput = new FormControl('');
  public animals: Animal[] = [];

  constructor(private animalService: AnimalesService) {}

  
  searchAnimal() {
    const alimentacion: string = this.alimentacionInput.value || '';
    const origen: string = this.origenInput.value || '';


    if (!alimentacion && !origen) {
      return;
    }

    this.animalService.getSuggestions(alimentacion, origen)
      .subscribe(animals => {
        console.log(animals);
        this.animals = animals;
      }, error => {
        console.error('Error al obtener los animales:', error);
      });
  }


  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedAnimal = undefined;
      return;
    }

    const animal: Animal = event.option.value;
    this.selectedAnimal = animal;
  }
}
