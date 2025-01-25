import { Alert, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { Cocktail } from "../../types";
import { searchCocktails } from "../../utils/api";

interface Props {
  setLoading: (value: boolean) => void;
  setCocktails: (value: Cocktail[]) => void;
}

export const SearchBar: React.FC<Props> = ({ setLoading, setCocktails }) => {
  const [query, setQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const onSearch = async (query: string) => {
    setLoading(true);
    try {
      const existingCocktails = JSON.parse(
        localStorage.getItem("cocktails") || "[]"
      ) as Cocktail[];
      const localResults = existingCocktails.filter((cocktail) =>
        cocktail.strDrink.toLowerCase().includes(query.toLowerCase())
      );

      if (localResults.length > 0) {
        setCocktails(localResults);
      } else {
        const results = await searchCocktails(query);
        if (results.length === 0) {
          setErrorMessage("Cocktail not found");
        }
        setCocktails(results);
      }
    } catch (error) {
      console.error("Error searching cocktails:", error);
      setErrorMessage("Cocktail not found");
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage]);
  
  return (
    <div className="search-bar">
      <div className="wrapper">
      <TextField
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
        placeholder="Insert cocktail name"
        variant="outlined"
        size="small"
      />
      <Button
        variant="outlined"
        sx={{ height: "40px" }}
        color="inherit"
        disabled={query.length===0}
        onClick={() => onSearch(query)}
      >
        Search
      </Button>
      </div>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </div>
  );
};
