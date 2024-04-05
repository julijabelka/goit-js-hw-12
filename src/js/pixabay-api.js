const API_KEY = '43233565-271a1074870da79dda90f0013';
const BASE_URL = 'https://pixabay.com';

export function getPictures(quest) {
  const params = {
    key: API_KEY,
    q: quest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };
  const options = new URLSearchParams(params);
  return fetch(`${BASE_URL}/api/?${options}`).then(res => {
    if (!res.ok) {
      console.error('The word is wrong!');
    }

    return res.json();
  });
}
