import csv
from src.models.dish import Dish
from src.models.ingredient import Ingredient

class MenuData:
    def __init__(self, source_path: str) -> None:
        self.dishes = set()
        self.ingredients = set()
        self._load_menu_data(source_path)

    def _load_menu_data(self, source_path: str) -> None:
        with open(source_path, newline="") as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                dish_name, dish_price, ingredient_name, recipe_amount = row[:4]

                ingredient = Ingredient(ingredient_name)
                self.ingredients.add(ingredient)

                dish = next(
                    (
                        di
                        for di in self.dishes
                        if di.name == dish_name and di.price == float(dish_price)
                    ),
                    None,
                )
                if dish is None:
                    dish = Dish(dish_name, float(dish_price))
                    self.dishes.add(dish)

                dish.add_ingredient_dependency(ingredient, int(recipe_amount))
