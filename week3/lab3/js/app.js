// Avatar----------------------------------------
const AVATAR_URL = 'https://avatars3.githubusercontent.com/u/43277189?v=4';
const myAvatar = document.querySelectorAll('.myAvatar');
myAvatar.forEach(img => (img.src = AVATAR_URL));

// Declare for Gifs upload
const gifBtn = document.querySelector('#gifBtn');
const body = document.querySelector('body');
let gifs = [];
let selectedGif = '';
let isImg = false;
let isMoving = false;
// upload image
const imgGifPoll = document.querySelector('#imgGifPoll');
const uploadPic = document.querySelector('#uploadPic');
// tweet
const tweetButton = document.querySelector('#tweet');
const textArea = document.querySelector('#textarea');
const main = document.querySelector('main');
const tweets = [];

// functions ----------------------------------------
// separate tweet to text, hashtag and no hashtag, and store into object
function handleTweet(searchText) {
  const regex = /#(\w+)/g;
  const tweet = {};
  const hashtags = searchText.match(regex);
  const tweetImg = document.querySelector('#tweetImg')
    ? document.querySelector('#tweetImg').dataset.src
    : false;
  if (tweetImg) {
    isImg = true;
    tweet.img = tweetImg;
  }
  if (selectedGif) {
    isImg = true;
    tweet.img = selectedGif;
  }

  if (!hashtags) {
    tweet.tweet = searchText;
    tweet.hashtag = [];
  } else {
    // get the text before #
    const index = searchText.indexOf('#');
    const text = searchText.slice(0, index).trim();
    // remove # before hashtag
    const hashtag = hashtags.map(item => item.replace('#', ''));
    tweet.tweet = text;
    tweet.hashtag = hashtag;
  }
  console.log(tweet);

  return tweet;
}

// Create a popup windou when gif icon onclick
function searchGif() {
  const popup = document.createElement('div');
  // To use closePopup function, exit should have same number of parentNode
  popup.innerHTML = `
	<div id="exit">
		<button type="button" class="exit mdi mdi-window-close" >
		</button>
	</div>
	<form class="container d-flex p-1 mb-1">
		<input id="inputGif" type="text" class="form-control" placeholder="Search for Gif" />
		<button id="searchGifBtn" type="button" class="btn btn-outline-secondary">Search</button>
	</form>
	<div id="switchgifsarea">
		<div class="custom-control custom-switch mt-2">
			<input type="checkbox" class="custom-control-input" id="switchGif">
			<label class="custom-control-label" for="switchGif">Toggle this switch element</label>
		</div>
	</div>
	<div id="gifsArea" class="d-flex flex-wrap"></div>
	`;
  popup.classList.add('popup');
  body.appendChild(popup);
  const searchGifBtn = document.querySelector('#searchGifBtn');
  const exitBtn = document.querySelector('.exit');
  const switchGif = document.querySelector('#switchGif');

  switchGif.addEventListener('change', gifToggle);
  searchGifBtn.addEventListener('click', getGifs);
  exitBtn.addEventListener('click', closePopup);
}
// Query gifs and display them
function getGifs(e) {
  e.preventDefault();
  // get input
  const searchValue = document.querySelector('#inputGif').value;
  gifs = [];
  fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=61LS6sJkDZ1d98sT1GNneTglTSt1L4z6&limit=10`
  )
    .then(response => response.json())
    .then(data => {
      // store object.data into an array
      gifs.push(...data.data);
      const gifsHTML = gifs
        .map(
          (gif, i) =>
            `<img class="gif" src="${gif.images.fixed_height_small_still.url}" data-index="${i}"/>`
        )
        .join('');
      const gifsArea = document.querySelector('#gifsArea');
      const switchGif = document.querySelector('#switchGif');
      switchGif.checked = false;
      isMoving = false;
      gifsArea.innerHTML = gifsHTML;
      gifsArea.addEventListener('click', chooseGif);
    });
}
// Toggle gifs
function gifToggle() {
  const gifs = document.querySelectorAll('.gif');
  isMoving = !isMoving;
  if (isMoving === true) {
    gifs.forEach(gif => {
      const src = gif.src.replace('100_s.gif', '100.gif');
      gif.src = src;
    });
  } else {
    gifs.forEach(gif => {
      const src = gif.src.replace('100.gif', '100_s.gif');
      gif.src = src;
    });
  }
}

// Display selected gif
function chooseGif(e) {
  // only target the list of gifs
  if (!e.target.matches('[data-index]')) {
    return;
  }
  e.preventDefault();
  const choseIndex = Number(e.target.dataset.index);
  // get better version of gif
  selectedGif = gifs[choseIndex].images.fixed_height.url;
  previewGif(choseIndex);
  closePopup(e);
}

// Delete the popup
function closePopup(e) {
  e.target.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode
  );
}

// Preview selected gif and img before tweeting
function previewGif(index) {
  imgGifPoll.innerHTML = `<img src="${gifs[index].images.fixed_height.url}" />`;
}
function handleFileSelect(e) {
  const reader = new FileReader();
  reader.addEventListener('load', evn => {
    imgGifPoll.innerHTML = `<img id="tweetImg" class="thumb" src="${evn.target.result}" data-src="${evn.target.result}" style="width:100%"/>`;
  });
  // read the image file as a data url base
  reader.readAsDataURL(e.target.files[0]);
}

// Store tweet to tweets array and clean textarea and preview
// hashtag links: map the noHashtag array in object
function tweeting(e) {
  e.preventDefault();
  const tweet = handleTweet(textArea.value);
  tweets.unshift(tweet);
  textArea.value = '';
  imgGifPoll.innerHTML = '';
  selectedGif = '';
  isImg = false;
  displayTweets(tweets);
}

// display from tweets array
function displayTweets(tweets) {
  const content = tweets
    .map(
      tweet => `
				<div class="fb container row justify-content-start border rounded p-3 mt-3">
					<img
						class="avatar"
						src="https://avatars3.githubusercontent.com/u/43277189?v=4"
						alt=""
					/>
					<div class="pl-2"> 
						<div>Louis L <span class="text-secondary ">@yhl123</span></div>
						<div class="mt-1">${tweet.tweet} 
						${tweet.hashtag

              .map(
                item => `
						<a href=https://twitter.com/hashtag/${item}?src=hashtag_click>#${item}</a>
						`
              )
              .join('')}
						</div>
						${
              tweet.img
                ? `<img id="tweetImg" class="thumb" src="${tweet.img}"  style="width:100%"/>`
                : ''
            }
                
						<div>
            
						
							<span class="mdi mdi-comment-outline pt-3 pr-3 pb-3"></span>
							<span class="mdi mdi-twitter-retweet p-3"></span>
							<span class="mdi mdi-upload p-3"></span>
							<span class="mdi mdi-heart p-3"></span>
						</div>
					</div>
				</div>
		`
    )
    .join('');
  main.innerHTML = content;
}

// EventListeners----------------------------------------
// img button
uploadPic.addEventListener('input', handleFileSelect);
// gif button
gifBtn.addEventListener('click', searchGif);
// tweet button
tweetButton.addEventListener('click', tweeting);
