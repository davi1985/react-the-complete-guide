import { useCallback, useEffect, useReducer } from "react";
import { Ingredient } from "../../@types";
import ErrorModal from "../UI/ErrorModal";
import { IngredientForm } from "./IngredientForm";
import IngredientList from "./IngredientList";
import { Search } from "./Search";

enum IngredientTypeEnum {
  ADD = "ADD",
  SET = "SET",
  DELETE = "DELETE",
}

const ingredientsReducer = (state: Ingredient[], action: any): Ingredient[] => {
  switch (action.type) {
    case IngredientTypeEnum.SET:
      return action.ingredients;

    case IngredientTypeEnum.ADD:
      return [...state, action.ingredient];

    case IngredientTypeEnum.DELETE:
      return state.filter((item: Ingredient) => item.id !== action.id);

    default:
      throw new Error("Should not get here!");
  }
};

enum HttpTypeEnum {
  SEND = "SEND",
  RESPONSE = "RESPONSE",
  ERROR = "ERROR",
  CLEAR = "CLEAR",
}

type HttpState = {
  loading: boolean;
  error: string | null;
};

type Action = {
  type: HttpTypeEnum;
  errorMessage: string | null;
};

const httpReducer = (httpState: HttpState, action: Action): HttpState => {
  switch (action.type) {
    case HttpTypeEnum.SEND:
      return { loading: true, error: null };
    case HttpTypeEnum.RESPONSE:
      return { ...httpState, loading: false };
    case HttpTypeEnum.ERROR:
      return { loading: false, error: action.errorMessage };
    case HttpTypeEnum.CLEAR:
      return { ...httpState, error: null };

    default:
      throw new Error("Should not be reached");
  }
};

const httpStateInitial = { loading: false, error: null };

export const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientsReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, httpStateInitial);

  useEffect(() => {
    fetch(
      "https://react-hooks-updated-5ec95-default-rtdb.firebaseio.com/ingredients.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const loadedIngredients: Ingredient[] = [];

        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
          });
        }

        dispatch({
          type: IngredientTypeEnum.SET,
          ingredients: loadedIngredients,
        });
      });
  }, []);

  const addIngredientHandler = (ingredient: Ingredient) => {
    dispatchHttp({ type: HttpTypeEnum.SEND, errorMessage: null });

    fetch(
      "https://react-hooks-updated-5ec95-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        dispatchHttp({ type: HttpTypeEnum.RESPONSE, errorMessage: null });

        return response.json();
      })
      .then((_) => {
        dispatch({
          type: IngredientTypeEnum.ADD,
          ingredient: { ...ingredient },
        });
      });
  };

  const filteredIngredientsHandler = useCallback(
    (filteredIngredients: Ingredient[]) =>
      dispatch({
        type: IngredientTypeEnum.SET,
        ingredients: filteredIngredients,
      }),
    []
  );

  const removeIngredientHandler = (ingredientId: string) => {
    dispatchHttp({ type: HttpTypeEnum.SEND, errorMessage: null });

    fetch(
      `https://react-hooks-updated-5ec95-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((_) => {
        dispatchHttp({ type: HttpTypeEnum.RESPONSE, errorMessage: null });

        dispatch({ type: IngredientTypeEnum.DELETE, id: ingredientId });
      })
      .catch((err) => {
        dispatchHttp({
          type: HttpTypeEnum.ERROR,
          errorMessage: "Something went wrong!",
        });
      });
  };

  const clearError = () =>
    dispatchHttp({ type: HttpTypeEnum.CLEAR, errorMessage: null });

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredient={filteredIngredientsHandler} />

        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};
