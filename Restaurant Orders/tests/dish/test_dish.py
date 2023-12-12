from src.models.dish import Dish  # noqa: F401, E261, E501
import pytest
from src.models.ingredient import (
    Ingredient,
    Restriction,
)

# Req 2
def test_dish():
    dish_one = Dish("dish_one", 20)
    dish_two = Dish("dish_two", 15)

    assert dish_one.name == "dish_one"
    assert dish_one.price == 20
    assert dish_two.name == "dish_two"
    assert dish_two.price == 15

    assert dish_one.__repr__() == "Dish('dish_one', R$20.00)"
    assert dish_two.__repr__() == "Dish('dish_two', R$15.00)"

    assert dish_one.__eq__(dish_one) is True
    assert dish_one.__eq__(dish_two) is False

    assert hash(dish_one) == hash("Dish('dish_one', R$20.00)")
    assert hash(dish_one) != hash(dish_two)

    dish_one.add_ingredient_dependency(Ingredient("ovo"), 5)
    dish_one.add_ingredient_dependency(Ingredient("salmão"), 1)

    assert dish_one.get_restrictions() == {
         Restriction.ANIMAL_MEAT,
         Restriction.SEAFOOD,
         Restriction.ANIMAL_DERIVED,
    }

    assert dish_one.get_ingredients() == {Ingredient("ovo"),
                                         Ingredient("salmão")}
    assert dish_one.recipe == {Ingredient("ovo"): 5, Ingredient("salmão"): 1}

    with pytest.raises(ValueError) as error:
        Dish("ovo", -30)
    assert str(error.value) == "Dish price must be greater then zero."

    with pytest.raises(TypeError) as error:
        Dish("salmão", "480")
    assert str(error.value) == "Dish price must be float."
