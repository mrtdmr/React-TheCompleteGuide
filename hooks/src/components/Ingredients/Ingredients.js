import React, { useReducer, useEffect, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null
      };
    case 'RESPONSE':
      return {
        ...currentHttpState,
        loading: false
      };
    case 'ERROR':
      return {
        loading: false,
        error: action.errorMessage
      };
    case 'CLEAR':
      return {
        ...currentHttpState,
        error: null
      };
    default:
      throw new Error('Should not get there!');
  }
};

const calculateReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { ...state, count: action.count };
    case 'ADD':
      return { ...state, sum: state.sum + state.count };
    default:
      throw new Error('Should not get there!');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  });
  const [calcState, dispatchCalculate] = useReducer(calculateReducer, {
    count: 0,
    sum: 0
  });
  //const [userIngredients, setUserIngredients] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState();
  /*
  //useEffect gets executed after every component render a cycle.
  useEffect(() => {
    fetch('https://react-hooks-update-437a4.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);  //with [] as a second argument, useEffect() acts like componentDidMount. It runs ONLY ONCE(after first render). Without [] as a second argument, useEffect acts like componentDidMount. It runs after every component render.
  */

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    //setUserIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);
  const addIngredientHandler = ingredient => {
    //setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch('https://react-hooks-update-437a4.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        //setIsLoading(false);
        dispatchHttp({ type: 'RESPONSE' });
        return response.json();
      })
      .then(responseData => {
        // setUserIngredients(prevIngredients => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient }
        // ]);
        dispatch({
          type: 'ADD',
          ingredient: { id: responseData.name, ...ingredient }
        });
      });
  };
  const removeIngredientHandler = ingredientId => {
    //setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch(
      `https://react-hooks-update-437a4.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE'
      }
    )
      .then(response => {
        //setIsLoading(false);
        dispatchHttp({ type: 'RESPONSE' });
        // setUserIngredients(prevIngredients =>
        //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
        // );
        dispatch({ type: 'DELETE', id: ingredientId });
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
        //setError('Something went wrong!');
        //setIsLoading(false);
      });
  };
  const clearErrorHandler = () => {
    dispatchHttp({ type: 'CLEAR' });
    //setError(null);
  };
  const addHandle = () => {
    dispatchCalculate({ type: 'ADD' });
  };
  return (
    <div className='App'>
      {httpState.error && (
        <ErrorModal onClose={clearErrorHandler}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
      <input
        type='number'
        onChange={event =>
          dispatchCalculate({
            type: 'SET',
            count: parseInt(event.target.value)
          })
        }
      />
      <button onClick={addHandle}>Artır</button>
      <input type='number' value={calcState.sum} readOnly />
    </div>
  );
};

export default Ingredients;
