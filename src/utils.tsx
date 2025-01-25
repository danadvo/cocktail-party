import { ApiDrink, Cocktail } from "./types";

export const formatCocktailData = (drink: ApiDrink): Cocktail => {
    const ingredients: string[] = [];
    const measures: string[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push(ingredient);
        measures.push(measure || "");
      }
    }

    return {
      idDrink: drink.idDrink,
      strDrink: drink.strDrink,
      strInstructions: drink.strInstructions,
      strDrinkThumb: drink.strDrinkThumb,
      ingredients,
      measures,
    };
  };