import { Cocktail } from "../../types";
import Header from "../Header/Header";
import { Alert, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NewCocktailForm.css";

export const NewCocktailForm: React.FC = () => {
  const [formData, setFormData] = useState({
    strDrink: "",
    strInstructions: "",
    strDrinkThumb: "",
    ingredients: [""],
    measures: [""],
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    type?: "ingredients" | "measures"
  ) => {
    const { name, value } = e.target;

    if (type && index !== undefined) {
      setFormData((prevData) => {
        const updatedArray = [...prevData[type]];
        updatedArray[index] = value;
        return { ...prevData, [type]: updatedArray };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const addIngredientOrMeasure = (type: "ingredients" | "measures") => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], ""],
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.strDrink || !formData.strInstructions) {
      setErrorMessage("Please fill in the required fields.");
      setSuccessMessage("");
      return;
    }

    const newCocktail: Cocktail = {
      idDrink: uuidv4(),
      strDrink: formData.strDrink,
      strInstructions: formData.strInstructions,
      strDrinkThumb: formData.strDrinkThumb,
      ingredients: formData.ingredients.filter((i) => i.trim() !== ""),
      measures: formData.measures.filter((m) => m.trim() !== ""),
    };

    try {
      const existingCocktails = JSON.parse(
        localStorage.getItem("cocktails") || "[]"
      ) as Cocktail[];
      localStorage.setItem(
        "cocktails",
        JSON.stringify([...existingCocktails, newCocktail])
      );
      setSuccessMessage("Cocktail added successfully!");
      setErrorMessage("");
      setFormData({
        strDrink: "",
        strInstructions: "",
        strDrinkThumb: "",
        ingredients: [""],
        measures: [""],
      });
    } catch (error) {
      setErrorMessage("Failed to save cocktail. Please try again.");
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [successMessage]); 

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <div className="new-cocktail-form">
      <Header
        title="Add New Cocktail"
        imageSrc="./public/orange-cocktail.png"
      />
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <form onSubmit={handleSubmit} className="form">
        <TextField
          label="Cocktail Name"
          name="strDrink"
          value={formData.strDrink}
          onChange={handleInputChange}
          fullWidth
          required
          size="small"
        />
        <TextField
          label="Instructions"
          name="strInstructions"
          value={formData.strInstructions}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          required
        />
        <TextField
          label="Image URL (optional)"
          name="strDrinkThumb"
          value={formData.strDrinkThumb}
          onChange={handleInputChange}
          fullWidth
          size="small"
        />
        {formData.ingredients.map((ingredient, index) => (
          <div className="item">
            <TextField
              key={`Ingredient-${index}`}
              label={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(e) => handleInputChange(e, index, "ingredients")}
              fullWidth
              size="small"
            />
            <Button
              variant="outlined"
              sx={{ height: "40px" }}
              color="inherit"
              disabled={ingredient.length === 0} 
              onClick={() => addIngredientOrMeasure("ingredients")}
            >
              Add
            </Button>
          </div>
        ))}

        {formData.measures.map((measure, index) => (
          <div className="item">
            <TextField
              key={`measure-${index}`}
              label={`Measure ${index + 1}`}
              value={measure}
              fullWidth
              size="small"
              onChange={(e) => handleInputChange(e, index, "measures")}
            />
            <Button
              variant="outlined"
              sx={{ height: "40px" }}
              color="inherit"
              onClick={() => addIngredientOrMeasure("measures")}
              disabled={measure.length === 0} 
            >
              Add
            </Button>
          </div>
        ))}
        <Button
          type="submit"
          variant="outlined"
          color="inherit"
          className="submit"
          disabled={!formData.strDrink || !formData.strInstructions}
        >
          Save Cocktail
        </Button>
      </form>
    </div>
  );
};
