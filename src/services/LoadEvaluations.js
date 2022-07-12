export function getEvaluations(key) {
  const request = JSON.parse(localStorage.getItem(key));

  return request;
}

export function saveEvaluations(evaluations) {
  localStorage.setItem('evaluations', JSON.stringify(evaluations));
}

// const readFavoriteSongs = () => JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY));

// export const getFavoriteSongs = () => new Promise((resolve) => {
//   const favoriteSongs = readFavoriteSongs();
//   simulateRequest(favoriteSongs)(resolve);
// });
