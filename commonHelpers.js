import{S as p,i}from"./assets/vendor-8c59ed88.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const d="43233565-271a1074870da79dda90f0013",f="https://pixabay.com";function m(s){const e={key:d,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"},o=new URLSearchParams(e);return fetch(`${f}/api/?${o}`).then(n=>(n.ok||console.error("The word is wrong!"),n.json()))}function g(s){return s.map(e=>`<li class="gallery-item">
                <a class="gallery-link" href='${e.largeImageURL}'>
                  <img class="gallery-image" src='${e.webformatURL}' alt='${e.tags}' />
                </a>
                <div class="stats">
                  <p><span>Likes</span>${e.likes}</p>
                  <p><span>Views</span>${e.views}</p>
                  <p><span>Comments</span>${e.comments}</p>
                  <p><span>Downloads</span>${e.downloads}</p>
                </div>
              </li>`).join("")}const y=document.querySelector(".form"),l=document.querySelector(".gallery"),u=document.querySelector(".loader");y.addEventListener("submit",L);const h=new p(".gallery-link",{captionsData:"alt",captionDelay:250,overlay:!0,overlayOpacity:.7});function L(s){s.preventDefault(),S(),l.innerHTML="";const e=s.target.queryInput.value;e!==""?m(e).then(o=>{if(o.hits.length===0)return i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});l.innerHTML=g(o.hits),h.refresh()}).catch(o=>{console.log(o)}).finally(()=>{c()}):(c(),i.error({message:"Please, enter a word",position:"topRight"}))}function S(){u.classList.remove("is-hidden")}function c(){u.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
