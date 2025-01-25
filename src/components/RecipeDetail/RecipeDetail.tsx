import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Cocktail } from "../../types";
import Header from "../Header/Header";
import "./RecipeDetail.css";
import { getCocktail } from "../../utils/api";

export const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCocktail = async () => {
    setLoading(true);
    try {
      if (!id) throw new Error("Recipe ID is required");
      const existingCocktails = JSON.parse(
        localStorage.getItem("cocktails") || "[]"
      ) as Cocktail[];
      const localCocktail = existingCocktails.find(
        (cocktail) => cocktail.idDrink === id
      );

      if (localCocktail) {
        setCocktail(localCocktail);
      } else {
        const response = await getCocktail(id);
        if (!response) {
          setError("Cocktail not found");
        }
        setCocktail(response);
      }
    } catch (err) {
      const error = err as Error | AxiosError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktail();
  }, [id, navigate]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (!cocktail || error) ? <h2>{error || "Cocktail not found"}</h2> : (
    <div className="recipe-detail">
      <Header title={cocktail.strDrink} imageSrc={cocktail.strDrinkThumb} />
      <div className="recipe-content">
        <h2>Ingredients:</h2>
        {cocktail.ingredients.map((ingredient, index) => (
          <h4 key={`${ingredient}-${index}`}>
            {cocktail.measures[index] && (
              <span>{cocktail.measures[index]}</span>
            )}
            {ingredient}
          </h4>
        ))}
        <h2>Instructions:</h2>
        <p>
          {cocktail.strInstructions}
        </p>
      </div>
    </div>
  );
};
