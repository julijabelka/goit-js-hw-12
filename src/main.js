import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPictures } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');
let page = 1;
let questForm = '';

loadMore.addEventListener('click', handleClick);

form.addEventListener('submit', handleSubmit);

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
  overlay: true,
  overlayOpacity: 0.7,
});

async function handleSubmit(event) {
  event.preventDefault();
  loadMore.classList.add('is-hidden');

  loaderStart();
  gallery.innerHTML = '';
  page = 1;
  questForm = event.target['queryInput'].value;

  if (questForm !== '') {
    try {
      const response = await getPictures(questForm, page);
      if (response.hits.length === 0) {
        return iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
      gallery.innerHTML = createMarkup(response.hits);

      lightbox.refresh();
      if (response.total > 15) {
        loadMore.classList.remove('is-hidden');
      }
      event.target['queryInput'].value = '';
    } catch (error) {
      iziToast.error({
        message: `Ups... ${error}`,
        position: 'topRight',
      });
    }

    loaderStop();
  } else {
    loaderStop();
    iziToast.error({
      message: 'Please, enter a word',
      position: 'topRight',
    });
  }
}

async function handleClick() {
  loaderStart();

  page += 1;
  try {
    const response = await getPictures(questForm, page);
    const lastPage = Math.ceil(response.total / 15);

    gallery.insertAdjacentHTML('beforeend', createMarkup(response.hits));

    lightbox.refresh();
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    if (lastPage === page) {
      loadMore.classList.add('.is-hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topLeft',
      });
    }
  } catch (error) {
    console.log(error);
  }

  loaderStop();
}

function loaderStart() {
  loader.classList.remove('is-hidden');
}
function loaderStop() {
  loader.classList.add('is-hidden');
}
