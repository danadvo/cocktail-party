import React, { useState } from "react";
import "./Home.css";
import Header from "../Header/Header";
import { SearchBar } from "../SearchBar/SearchBar";
import { CocktailGrid } from "../CocktailGrid/CocktailGrid";
import { Cocktail } from "../../types";

interface Props {}

export const Home: React.FC<Props> = ({}) => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);


  return (
    <div className="home">
      <Header title={"It's Cocktail Time"} imageSrc="/cocktail.webp" />
      <SearchBar setCocktails={setCocktails} setLoading={setLoading} />
      {cocktails.length > 0 ? (
        <CocktailGrid cocktails={cocktails} loading={loading} />
      ) : null}
    </div>
  );
};
