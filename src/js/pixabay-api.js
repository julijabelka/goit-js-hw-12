import axios from 'axios';

const API_KEY = '43233565-271a1074870da79dda90f0013';
const BASE_URL = 'https://pixabay.com/api/';

export async function getPictures(quest, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: quest,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
