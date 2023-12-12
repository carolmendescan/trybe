import PropTypes from 'prop-types';

function StartButton({ startState, id, type }) {
  const [start, setStart] = startState;
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    Meal: {},
    Drink: {},
  };

  const isInProgress = Object.keys(inProgressRecipes[type])
    .some((recipe) => recipe === id);

  const startRecipe = () => {
    setStart(true);
    if (isInProgress) {
      return;
    }
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ ...inProgressRecipes,
        [type]: { ...inProgressRecipes[type], [id]: [],
        },
      }),
    );
  };

  if (start) return;
  return (
    <button
      onClick={ () => startRecipe() }
      className="bg-green-400 py-[1.5px] text-black px-2 rounded-md"
    >
      { isInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );
}

StartButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  startState: PropTypes.arrayOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default StartButton;
