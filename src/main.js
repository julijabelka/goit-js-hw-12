import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPictures } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSubmit);

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
  overlay: true,
  overlayOpacity: 0.7,
});

function handleSubmit(event) {
  event.preventDefault();

  loaderStart();
  gallery.innerHTML = '';
  const questForm = event.target['queryInput'].value;

  if (questForm !== '') {
    getPictures(questForm)
      .then(response => {
        if (response.hits.length === 0) {
          return iziToast.error({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
        }
        gallery.innerHTML = createMarkup(response.hits);

        lightbox.refresh();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        loaderStop();
      });
  } else {
    loaderStop();
    iziToast.error({
      message: 'Please, enter a word',
      position: 'topRight',
    });
  }
}

function loaderStart() {
  loader.classList.remove('is-hidden');
}
function loaderStop() {
  loader.classList.add('is-hidden');
}
