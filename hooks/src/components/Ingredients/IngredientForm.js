import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {
  /*Array destructuring */
  /*const [inputState, setInputState] = useState({
    title: '',
    amount: ''
  });*/ //state doesn't need to be an object, it can be everything in hooks. But in class based components, state was an object.
  //Splitting multiple states:
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
  };
  console.log('RENDERING INGREDIENTFORM...');
  /** inputState[0] value, inputState[1] setState function */
  return (
    <section className='ingredient-form'>
      <Card>
        <form onSubmit={submitHandler}>
          {/*
            <div className='form-control'>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              id='title'
              value={inputState.title}
              onChange={event => {
                const newTitle = event.target.value;
                setInputState(prevInputState => ({
                  title: newTitle,
                  amount: prevInputState.amount
                }));
              }}
            />
          </div>
            */}
          <div className='form-control'>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              id='title'
              value={enteredTitle}
              onChange={event => {
                setEnteredTitle(event.target.value);
              }}
            />
          </div>
          {/*<div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              id='amount2'
              value={inputState.amount}
              onChange={event => {
                const newAmount = event.target.value;
                setInputState(prevInputState => ({
                  amount: newAmount,
                  title: prevInputState.title
                }));
              }}
            />
          </div> */}

          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              id='amount'
              value={enteredAmount}
              onChange={event => {
                setEnteredAmount(event.target.value);
              }}
            />
          </div>
          <div className='ingredient-form__actions'>
            <button type='submit'>Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
