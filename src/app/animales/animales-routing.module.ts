import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AnimalPageComponent } from './pages/animal-page/animal-page.component';

const routes: Routes = [

  {

    path: '',
    component: LayoutPageComponent,
    children: [

      {path: 'nuevo-animal', component: NewPageComponent},
      {path: 'buscar', component: SearchPageComponent},
      {path: 'editar/:id', component: NewPageComponent},
      {path: 'lista', component: ListPageComponent},
      {path: ':id', component: AnimalPageComponent},
      {path: '**', redirectTo: 'lista'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalesRoutingModule { }
