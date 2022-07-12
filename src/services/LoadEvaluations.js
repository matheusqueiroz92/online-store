// if (!JSON.parse(localStorage.getItem('evaluations'))) {
//   localStorage.setItem('evaluations', JSON.stringify([]));
// }

export function getEvaluations(key) {
  const request = JSON.parse(localStorage.getItem(key));

  return request;
}

export function saveEvaluations(evaluations) {
  localStorage.setItem('evaluations', JSON.stringify(evaluations));
}

export const readEvaluations = () => {
  JSON.parse(localStorage.getItem('evaluations'));
};

export const addEvaluation = (evaluation) => {
  if (!JSON.parse(localStorage.getItem('evaluations'))) {
    localStorage.setItem('evaluations', JSON.stringify([]));
  }
  if (evaluation) {
    const listedEvaluation = getEvaluations('evaluations');
    saveEvaluations([...listedEvaluation, evaluation]);
  }
};
