import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    // importa arriba el modelo de ingredient para usarlo en este modelo.
    public ingredients: Ingredient[];

    //cuando se crea una nueva instancia de este modelo pasa al constructor los valores y estos se asignan a las variables creadas arriba.
    constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}