import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is a description', 'http://del.h-cdn.co/assets/15/28/980x490/landscape-1436393143-gettyimages-184130285.jpg'),
    new Recipe('Another test recipe', 'This is a description', 'http://www.landeffects.ca/Images/BLOG/Brick-Pizza-Oven.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }



  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
