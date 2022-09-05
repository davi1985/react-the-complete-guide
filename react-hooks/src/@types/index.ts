export type Ingredient = {
  id: string;
  title: string;
  amount: string;
};

export type IngredientFormProps = {
  onAddIngredient: (ingredient: Ingredient) => void;
  loading: boolean;
};
