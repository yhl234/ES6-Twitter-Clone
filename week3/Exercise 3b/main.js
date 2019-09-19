const button = document.querySelector('button');
const gifsArea = document.querySelector('#gifsArea');
let gifs = [];

function getGifs() {
  // get input
  const searchValue = document.querySelector('input').value;
  gifs = [];
  fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=61LS6sJkDZ1d98sT1GNneTglTSt1L4z6&limit=10`
  )
    .then(response => response.json())
    .then(data => {
      // store object.data into an array
      gifs.push(...data.data);
      const display = gifs
        .map(
          (gif, i) =>
            `<img src="${gif.images.fixed_height_small.url}" data-index="${i}"/>`
        )
        .join('');
      gifsArea.innerHTML = display;
    });
}
function chooseGif(e) {
  // only target the list of gifs
  if (!e.target.matches('[data-index]')) {
    return;
  }
  e.preventDefault();
  const chose = Number(e.target.dataset.index);
  // get better version of gif
  gifsArea.innerHTML = `<img src="${gifs[chose].images.fixed_height.url}" />`;
}
button.addEventListener('click', getGifs);
gifsArea.addEventListener('click', chooseGif);
