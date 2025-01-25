import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NewCocktailForm } from "./components/NewCocktailForm/NewCocktailForm";
import { RecipeDetail } from "./components/RecipeDetail/RecipeDetail";
import { AppBar, Button, Toolbar } from "@mui/material";
import { Home } from "./components/Home/Home";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position="static" className="header-navbar">
          <Toolbar className="toolbar">
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/new">
              Add cocktail
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewCocktailForm />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
