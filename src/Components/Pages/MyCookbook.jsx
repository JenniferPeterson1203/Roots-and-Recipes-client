import { useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";

import { getUserData } from "../../helpers/getUserData";

import { capitalizeFirstLetter } from "../../helpers/helpers";
import useHandleSearchChange from "../../helpers/useHandleSearchChange";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

const URL = import.meta.env.VITE_BASE_URL;

export const MyCookbook = ({ setBurgerToggle }) => {
  const navigate = useNavigate();

  const [myRecipes, setMyRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  // const [input, setInput] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  // const [heartStates, setHeartStates] = useState([]);

  const { searchInput, handleSearchChange, clearSearch } =
    useHandleSearchChange(myRecipes, setRecipes, (isDefault) => {
      if (isDefault) {
        setRecipes(myRecipes);
      }
    });

  const fetchMyRecipes = (userId) => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${URL}/api/recipes/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMyRecipes(data);
            setRecipes(data);
            // setHeartStates(new Array(data.length).fill(false));
          } else {
            console.error("Error fetching recipes:", data);
            setMyRecipes([]);
            setRecipes([]);
          }
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  };

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();
      if (user) {
        setUserDetails(user);
        fetchMyRecipes(user.id);
      }
      setBurgerToggle(false);
    }

    getUser();
  }, []);

  // const toggleHeart = (index) => {
  //   setHeartStates((prevStates) =>
  //     prevStates.map((state, i) => (i === index ? !state : state))
  //   );
  // };

  // Determine the display name based on nickname or first name
  const displayName = userDetails
    ? userDetails.nickname
      ? `${capitalizeFirstLetter(userDetails.nickname)}'s Cookbook`
      : `${capitalizeFirstLetter(
          userDetails.first_name.split(" ")[0]
        )}'s Cookbook`
    : "My Cookbook";

  return (
    <div className="text-center">
      <div className="bg-[#713A3A] text-[#FFDAB9] mt-10">{displayName}</div>
      <div className="bg-[#FFDAB9]">
        <div className="relative inline-flex w-48 mr-2">
          <input
            className="h-full flex-grow outline-none text-lg text-black rounded-xl pr-8"
            type="text"
            id="search"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
          />
          {searchInput && (
            <div
              onClick={clearSearch}
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
            >
              <ClearIcon />
            </div>
          )}
        </div>

        {!myRecipes.length ? (
          <Link to={"/create_a_recipe"}>
            <p className="text-center bg-[#D9D9D9]">
              Add a recipe
              <span>+</span>
            </p>
          </Link>
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipe_show/${recipe.id}`}>
              <div className="flex items-center mt-4 mx-10">
                <div className="border-solid border-2 border-black rounded-xl flex-1">
                  <p className="p-4 rounded-lg text-[#FFFFFF] bg-[#713A3A]">
                    {recipe.name} <span className="ml-6">+</span>
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center bg-[#D9D9D9] p-4">
            Sorry, recipe cannot be found
          </p>
        )}
      </div>
    </div>
  );
};
