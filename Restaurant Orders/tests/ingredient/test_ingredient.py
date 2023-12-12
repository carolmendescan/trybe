from src.models.ingredient import (
    Ingredient,
    Restriction,
)

# Req 1
def test_ingredient():
    ingredient_first = Ingredient("carne")
    ingredient_second = Ingredient("frango")
    ingredient_third = Ingredient("carne")
    assert ingredient_first.name == "carne"
    assert ingredient_first.restrictions == {
        Restriction.ANIMAL_MEAT,
        Restriction.ANIMAL_DERIVED,
    }
    assert ingredient_first.__eq__(ingredient_second) is False
    assert ingredient_first.__eq__(ingredient_third) is True
    assert repr(ingredient_first) == "Ingredient('carne')"
    assert hash(ingredient_first) == hash(ingredient_third)
    assert hash(ingredient_first) != hash(ingredient_second)
