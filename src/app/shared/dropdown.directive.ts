import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // HostBinding bindea la propiedad al elemento que queremos dar la directiva y le pasa por parametro que sea la clase open.
  // si es true HostBinding pone la clase open, si es false la quita
  // setea isOpen
  @HostBinding('class.open') isOpen = false;

  // se pone a la escucha del click
  @HostListener('click') toggleOpen() {
    // si es false le pone true, si es true a false.
    this.isOpen = !this.isOpen;
  }


  constructor() { }

}
