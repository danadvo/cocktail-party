import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cocktail } from "../../types";
import { Button, Typography } from "@mui/material";
import "./CocktailGrid.css";

interface Props {
  cocktails: Cocktail[];
  loading: boolean;
}

export const CocktailGrid: React.FC<Props> = ({ cocktails, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cocktails.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cocktails.length - 1 ? 0 : prev + 1));
  };

  const navigationButton = (type: "prev" | "next") => cocktails.length > 1 && (
    <Button
      variant="text"
      onClick={type === "prev" ? handlePrev : handleNext}
      className="navigation-button"
      sx={{
        left: type === "prev" ? "16px" : "auto",
        right: type === "next" ? "16px" : "auto",
      }}
    >
      <img src={type === "next" ? "./next.png" : "./back.png"} width="50px" />
    </Button>
  );

  return (
    <div className="cocktail-grid">
      <div
        className="gallery-container"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {cocktails.map((cocktail) => (
          <div key={cocktail.idDrink} className="cocktail-card">
            <Link to={`/recipe/${cocktail.idDrink}`} className="link">
              <Typography variant="h6" fontWeight="bold">
                {cocktail.strDrink}
              </Typography>
              <img
                src={cocktail.strDrinkThumb}
                className="cocktail-image"
              />
            </Link>
          </div>
        ))}
      </div>

      {navigationButton("prev")}
      {navigationButton("next")}
    </div>
  );
};
