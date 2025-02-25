import { Component, OnInit } from '@angular/core';
import { Animal } from '../../interfaces/animal.interface';
import { AnimalesService } from '../../animales.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

  public animales: Animal[] = [];

  constructor(private animalesService: AnimalesService) {}

  ngOnInit(): void {
    this.animalesService.getAnimales()
      .subscribe(animales => {
        this.animales = animales;
      });
  }

}
