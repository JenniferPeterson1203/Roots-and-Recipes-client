import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import useHandleSearchChange from "../../helpers/useHandleSearchChange";
import { Link } from "react-router-dom";
import placeholderImage from "../../assets/recipe_place_holder.png";
import ClearIcon from "@mui/icons-material/Clear";

const URL = import.meta.env.VITE_BASE_URL;

const Home = ({ setBurgerToggle, setNavBarToggle }) => {
  const [allPublicRecipes, setAllPublicRecipes] = useState([]);
  const [allLunchRecipes, setAllLunchRecipes] = useState([]);
  const [allDinnerRecipes, setAllDinnerRecipes] = useState([]);
  const [homeDefault, setHomeDefault] = useState(true);
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const { searchInput, handleSearchChange, clearSearch } =
    useHandleSearchChange(allPublicRecipes, setSearchedRecipes, setHomeDefault);

  const user = getAuth();

  useEffect(() => {
    fetch(`${URL}/api/recipes`)
      .then((res) => res.json())
      .then((data) => {
        setAllPublicRecipes(data);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
    fetch(`${URL}/api/recipes/lunch`)
      .then((res) => res.json())
      .then((data) => {
        setAllLunchRecipes(data);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
    fetch(`${URL}/api/recipes/dinner`)
      .then((res) => res.json())
      .then((data) => {
        setAllDinnerRecipes(data);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
    setBurgerToggle(false);
    setNavBarToggle(true);
  }, []);

  //SORT RECIPES ? 🤔
  const sortRecipesAlphabetically = (recipes) => {
    return recipes.sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div className="p-4">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
        {searchInput && (
          <div
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 bg-none px-1 py-0.5 rounded"
          >
            <ClearIcon className="text-xs" />
          </div>
        )}
      </div>

      {homeDefault && (
        <>
          <h1 className="text-xl font-bold mb-4">Top Lunch Recipes</h1>
          <div className="flex overflow-x-auto space-x-4">
            {allLunchRecipes.map((singleLunchRecipe, index) => (
              <Link
                key={singleLunchRecipe.id}
                to={`/recipe_show/${singleLunchRecipe.id}`}>
                <div className="flex-shrink-0">
                  <p className="text-center mb-2">{singleLunchRecipe.name}</p>
                  <div className="w-48 h-48 relative">
                    <img
                      key={index}
                      src={singleLunchRecipe.photo || placeholderImage}
                      alt={`Recipe ${singleLunchRecipe.name}`}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <h1 className="text-xl font-bold mt-8 mb-4">Top Dinner Recipes</h1>
          <div className="flex overflow-x-auto space-x-4">
            {allDinnerRecipes.map((singleDinnerRecipe, index) => (
              <Link
                key={singleDinnerRecipe.id}
                to={`/recipe_show/${singleDinnerRecipe.id}`}>
                <div className="flex-shrink-0">
                  <p className="text-center mb-2">{singleDinnerRecipe.name}</p>
                  <div className="w-48 h-48 relative">
                    <img
                      key={index}
                      src={singleDinnerRecipe.photo || placeholderImage}
                      alt={`Recipe ${singleDinnerRecipe.name}`}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* All Recipes section */}
          <h1 className="text-xl font-bold mt-8 mb-4">All Recipes</h1>
          <div className="flex overflow-x-auto space-x-4">
            {sortRecipesAlphabetically(allPublicRecipes).map(
              (singleRecipe, index) => (
                <Link
                  key={singleRecipe.id}
                  to={`/recipe_show/${singleRecipe.id}`}>
                  <div className="flex-shrink-0">
                    <p className="text-center mb-2">{singleRecipe.name}</p>
                    <div className="w-48 h-48 relative">
                      <img
                        key={index}
                        src={singleRecipe.photo || placeholderImage}
                        alt={`Recipe ${singleRecipe.name}`}
                        className="object-cover w-full h-full rounded"
                      />
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </>
      )}

      {!homeDefault && (
        <>
          {searchedRecipes.length === 0 ? (
            <p className="text-center bg-gray-200 p-4">
              Sorry, recipe cannot be found
            </p>
          ) : (
            searchedRecipes.map((searchedRecipe, index) => (
              <Link
                key={searchedRecipe.id}
                to={`/recipe_show/${searchedRecipe.id}`}>
                <div key={index} className="mb-4">
                  <p className="text-center mb-2">{searchedRecipe.name}</p>
                  <div className="w-48 h-48 relative mx-auto">
                    <img
                      src={searchedRecipe.photo || placeholderImage}
                      alt={`Recipe ${searchedRecipe.name}`}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                </div>
              </Link>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Home;
