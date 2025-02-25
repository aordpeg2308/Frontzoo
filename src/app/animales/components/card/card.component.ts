import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../../interfaces/animal.interface';

@Component({
  selector: 'animales-animal-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent  implements OnInit{

  @Input()
  public animal!: Animal;

  ngOnInit(): void {
    if ( !this.animal ) throw Error ('El animal es requerido');
  }
}
