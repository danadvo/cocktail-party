import axios from 'axios';
import { Cocktail } from '../types';
import { formatCocktailData } from '../utils';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const searchCocktails = async (query: string): Promise<Cocktail[]> => {
  const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
  return formatCocktailsData(response.data.drinks || []);
};

const formatCocktailsData = (drinks: any[]): Cocktail[] => {
  return drinks.map(drink => formatCocktailData(drink));
};

export const getCocktail = async (id: string): Promise<Cocktail> => {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  )
  return response.data.drinks[0];
};