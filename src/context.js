import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searxhTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = async() => {
    setLoading(true);
    await fetch(`${url}${searxhTerm}`)
      .then(response => response.json())
      .then(data => {
        const {drinks} = data;
        console.log('drinks:', drinks)
        if(drinks){
          const newDrinks = drinks.map((item) => {
            const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
            return {
              id:idDrink,
              name : strDrink,
              image: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass
            }
          });

          setCocktails(newDrinks);
          setLoading(false);
        } else {
          setCocktails([]);
          setLoading(false);
        }
      });
  }
  useEffect(() => {
    fetchDrinks();
  }, [searxhTerm])
  return(
    <AppContext.Provider value={{loading, searxhTerm,cocktails, setSearchTerm}}>
      {children}
    </AppContext.Provider>)
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
