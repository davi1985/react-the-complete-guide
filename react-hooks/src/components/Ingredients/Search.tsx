import { memo, useEffect, useRef, useState } from "react";
import { Ingredient } from "../../@types";
import { Card } from "../UI/Card";

import "./Search.css";

type SearchProps = {
  onLoadIngredient: (args: Ingredient[]) => void;
};

export const Search = memo(({ onLoadIngredient }: SearchProps) => {
  const [enteredFilter, setEnteredFilter] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current?.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch(
          "https://react-hooks-updated-5ec95-default-rtdb.firebaseio.com/ingredients.json" +
            query
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

            onLoadIngredient(loadedIngredients);
          });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [enteredFilter, onLoadIngredient, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>

          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});
