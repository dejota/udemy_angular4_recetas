import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from './../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // importa el servicio DataStorageService
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  onSaveData() {
    /* gracias al return que usa en storeRecipes() puede subscribir desde este componente y no desde el servicio. */
    this.dataStorageService.storeRecipes()
      .subscribe(
        /* crea response y le pasa el tipo Response, tiene que importarse arriba */
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    /* cuando hace clic en Fetch Data en header.component.html llama a getRecipes del servicio dataStorageService */
    this.dataStorageService.getRecipes();
  }

}
