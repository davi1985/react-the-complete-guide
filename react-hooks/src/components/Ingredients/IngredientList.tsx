import { Ingredient } from "../../@types";
import "./IngredientList.css";

export const IngredientList = ({
  ingredients,
  onRemoveItem,
}: {
  ingredients: Ingredient[];
  onRemoveItem: (engredientId: string) => void;
}) => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {ingredients?.map((ig) => (
          <li key={ig.id} onClick={onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>

            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
