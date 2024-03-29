import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as recipesService from '../services/recipesService';
import { useAuthContext } from './AuthContext';

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
    const { id } = useAuthContext();
    const navigate = useNavigate();
    // const [recipes, setRecipes] = useState([]);

    // useEffect(() => {
    //     recipesService.getAll().then((result) => {
    //         setRecipes(result);
    //     });
    // }, []);
    // console.log(recipes);

    const onCreateRecipe = async (data) => {
        const newRecipe = await recipesService.create({
            ...data,
            ownerId: id,
            bought: false,
        });
        //if i find how to set state with correct data, then will be possible to handle all project with one useEffect and recipeContext
        // setRecipes((state) => [...state, newRecipe]);
        navigate('/recipes');
    };

    const contextValues = {
        onCreateRecipe,
        // recipes,
    };

    return (
        <RecipesContext.Provider value={contextValues}>
            {children}
        </RecipesContext.Provider>
    );
};

export const useRecipesContext = () => {
    const context = useContext(RecipesContext);

    return context;
};
