import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    /* se debe declarar lo que se quiere compartir */
    DropdownDirective
  ],
  exports: [
    /* se debe exportar para que otros modulos puedan alcanzar
    sino se exporta solo pueden usarlo dentro de la carpeta shared */
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule { }
