export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  ingredients: string[];
  measures: string[];
}

export interface ApiDrink {
    idDrink: string;
    strDrink: string;
    strInstructions: string;
    strDrinkThumb: string;
    [key: string]: string | null;
  }
  
export interface ApiResponse {
    drinks: ApiDrink[] | null;
  }