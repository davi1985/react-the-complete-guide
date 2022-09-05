import { FormEvent, memo, useState } from "react";
import { IngredientFormProps } from "../../@types";
import { Card } from "../UI/Card";
import { LoadingIndicator } from "../UI/LoadingIndicator";

import "./IngredientForm.css";

export const IngredientForm = memo(
  ({ onAddIngredient, loading }: IngredientFormProps) => {
    const [enteredTitle, setenteredTitle] = useState<string>("");
    const [enteredAmount, setEnteredAmount] = useState<string>("");

    const submitHandler = (event: FormEvent) => {
      event.preventDefault();

      if (!enteredTitle || !enteredAmount) return;

      onAddIngredient({
        id: Math.random().toString(),
        title: enteredTitle,
        amount: enteredAmount,
      });

      setenteredTitle("");
      setEnteredAmount("");
    };

    return (
      <section className="ingredient-form">
        <Card>
          <form onSubmit={submitHandler}>
            <div className="form-control">
              <label htmlFor="title">Name</label>

              <input
                type="text"
                id="title"
                value={enteredTitle}
                onChange={(event) => setenteredTitle(event.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="amount">Amount</label>

              <input
                type="number"
                id="amount"
                value={enteredAmount}
                onChange={(event) => setEnteredAmount(event.target.value)}
              />
            </div>

            <div className="ingredient-form__actions">
              <button type="submit">Add Ingredient</button>

              {loading ? <LoadingIndicator /> : null}
            </div>
          </form>
        </Card>
      </section>
    );
  }
);
