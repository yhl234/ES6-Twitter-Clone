// Avatar----------------------------------------
const AVATAR_URL = 'https://avatars3.githubusercontent.com/u/43277189?v=4';
const myAvatar = document.querySelectorAll('.myAvatar');
myAvatar.forEach(img => (img.src = AVATAR_URL));

// Declare for Gifs upload
const gifBtn = document.querySelector('#gifBtn');
const searchGifBtn = document.querySelector('#searchGifBtn');
const switchGif = document.querySelector('#switchGif');
const gifPopup = document.querySelector('#gifPopup');
const gifsArea = document.querySelector('#gifsArea');

let gifs = [];
let selectedGif = '';
let isMoving = false;
// let isPolling = false;
// let isVoted = false;
let votes = {};
// Preview place
const imgGifPoll = document.querySelector('#imgGifPoll');
// Upload image
const uploadPic = document.querySelector('#uploadPic');
// Poll
const pollBtn = document.querySelector('#pollBtn');
// Emoji
const emojiPopup = document.querySelector('#emojiPopup');
const emojiBtn = document.querySelector('#emojiBtn');
const emojis = [];
const emojiArea = document.querySelector('#emojiArea');
const inputEmoji = document.querySelector('#inputEmoji');
const categoryEmoji = document.querySelectorAll('[data-category]');

// Exit button
const exitBtns = document.querySelectorAll('.exitBtn');

// tweet
const tweetButton = document.querySelector('#tweet');
const textArea = document.querySelector('#textarea');
const main = document.querySelector('main');
let tweets = JSON.parse(localStorage.getItem('tweets')) || [];

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
    tweet.img = tweetImg;
  }
  if (selectedGif) {
    tweet.img = selectedGif;
  }
  if (
    document.querySelector('#pollchoice1') &&
    document.querySelector('#pollchoice2') &&
    document.querySelector('#pollchoice3') &&
    document.querySelector('#pollchoice4')
  ) {
    tweet.poll = [
      document.querySelector('#pollchoice1').value,
      document.querySelector('#pollchoice2').value,
      document.querySelector('#pollchoice3').value,
      document.querySelector('#pollchoice4').value,
    ];
    tweet.isPolling = true;
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
  // console.log(tweet);

  return tweet;
}
/*
----------------------------------------------
Gif
----------------------------------------------
*/
// Create a popup window when gif icon onclick
function searchGif() {
  gifPopup.classList.toggle('hide');
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

// Delete the popup
function togglePopup(e) {
  e.target.parentNode.parentNode.classList.toggle('hide');
}

// Preview selected gif and img before tweeting
function previewGif(index) {
  imgGifPoll.innerHTML = `<img src="${gifs[index].images.fixed_height.url}" />`;
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
  togglePopup(e);
}
function handleFileSelect(e) {
  const reader = new FileReader();
  reader.addEventListener('load', evn => {
    imgGifPoll.innerHTML = `<img id="tweetImg" class="thumb" src="${evn.target.result}" data-src="${evn.target.result}" style="width:100%"/>`;
  });
  // read the image file as a data url base
  reader.readAsDataURL(e.target.files[0]);
}

/*
----------------------------------------------
Poll
----------------------------------------------
*/
// Show form after pollBtn click
function insertPoll() {
  textArea.placeholder = 'Ask a question...';
  imgGifPoll.innerHTML = `
                <form>
                  <div class="form-group">
                    <input type="text" class="form-control" id="pollchoice1" aria-describedby="" maxlength="25" placeholder="Choice 1">
                    <br>
                    <input type="text" class="form-control" id="pollchoice2" aria-describedby="" maxlength="25" placeholder="Choice 2">
                    <br>
                    <input type="text" class="form-control" id="pollchoice3" aria-describedby="" maxlength="25" placeholder="Choice 3">
                    <br>
                    <input type="text" class="form-control" id="pollchoice4" aria-describedby="" maxlength="25" placeholder="Choice 4">
                    <br><br>
                    <h6>Poll length</h6>
                    <hr style="margin:0">
                    <div class="row">
                      <div class="col">
                        <label for="polldays">Days</label>
                        <select class="form-control" id="polldays">
                          <option>0</option>
                          <option selected>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                      <div class="col">
                        <label for="pollhours">Hours</label>
                        <select class="form-control" id="pollhours">
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                      <div class="col">
                        <label for="pollminutes">Minutes</label>
                        <select class="form-control" id="pollminutes">
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>                        
                    </div>
                  </div>
                </form>
	`;
}
// Get vote data
async function getVotes() {
  const res = await fetch(
    'https://my.api.mockaroo.com/twitter_vote.json?key=bd549ad0'
  );
  const voteJson = await res.json();
  votes = await voteJson;
}
// Store input in to object
async function vote(e) {
  if (e.target.matches('.vote')) {
    await getVotes();
    // console.log(voteResult);
    const tweetsIndex = e.target.parentNode.dataset.index;
    const select = e.target.dataset.selected;
    // the poll are being vote
    tweets[tweetsIndex].result = votes;
    tweets[tweetsIndex].selected = select;
    getPercent(tweetsIndex);
  }
}
function getPercent(tweetsIndex) {
  const res = tweets[tweetsIndex].result;
  const total = Number(res.a) + Number(res.b) + Number(res.c) + Number(res.d);
  const percents = {
    a: Math.floor((Number(res.a) / total) * 100),
    b: Math.floor((Number(res.b) / total) * 100),
    c: Math.floor((Number(res.c) / total) * 100),
    d: Math.floor((Number(res.d) / total) * 100),
  };
  tweets[tweetsIndex].total = total;
  tweets[tweetsIndex].percents = percents;
  // the poll are being vote
  displayVoteResult(tweetsIndex);
  tweets[tweetsIndex].isVoted = true;
  tweets[tweetsIndex].isPolling = false;
  displayTweets();
}
// display vote result

function showSelected(tweet) {
  const change = document.querySelector(`[data-vote=${tweet.selected}]`);
  change.classList.add('primary');
}
/*
----------------------------------------------
Emoji
----------------------------------------------
*/

// fetch emoji, store it and display it
async function loadEmoji() {
  const response = await fetch(
    'https://unpkg.com/emoji.json@12.1.0/emoji.json'
  );
  const data = await response.json();
  emojis.push(...data);
  const emojiHtml = emojis
    .map(
      emoji =>
        `<div class="emoji" data-char="${emoji.char}">${emoji.char}</div>`
    )
    .join('');
  emojiArea.innerHTML = emojiHtml;
}
function browseEmoji() {
  emojiPopup.classList.toggle('hide');
}

// search emoji by data-category or input
function searchEmojis(e) {
  const emojiInput = e.target.dataset.category || e.target.value;
  emojiArea.innerHTML = emojis
    .filter(
      emoji =>
        emoji.name.includes(emojiInput) || emoji.category.includes(emojiInput)
    )
    .map(
      emoji =>
        `<div class="emoji" data-char="${emoji.char}">${emoji.char}</div>`
    )
    .join('');
  emojiArea.scrollTop = 0;
}

function addEmoji(e) {
  if (!e.target.matches('[data-char]')) {
    return;
  }
  e.preventDefault();
  textArea.value += e.target.dataset.char;
}
/*
----------------------------------------------
Display
----------------------------------------------
*/
function displayTweetHead() {
  return `<div class="fb container row justify-content-start border rounded p-3 mt-3">
					<img
						class="avatar"
						src="https://avatars3.githubusercontent.com/u/43277189?v=4"
						alt=""
					/>`;
}
function displayImg(tweet) {
  return `<img id="tweetImg" class="thumb" src="${tweet.img}"  style="width:100%"/>`;
}
function displayPoll(tweet, index) {
  return `<div class="poll flex-col" data-index="${index}">
										<button class="vote" data-selected="a">${tweet.poll[0]}</button>
										<button class="vote" data-selected="b">${tweet.poll[1]}</button>
										<button class="vote" data-selected="c">${tweet.poll[2]}</button>
										<button class="vote" data-selected="d">${tweet.poll[3]}</button>
									</div>`;
}
function displayVoteResult(tweet) {
  return `<div class="bargraph">
    					<div id="bar1" class="bar" style="flex-basis: ${
                tweet.percents.a
              }%" data-vote="a">${tweet.poll[0]} 
								</div>
			
								<div id="percentage2">${tweet.percents.b}%</div>
							</div><div class="bargraph">
									<div id="bar1" class="bar" style="flex-basis: ${
                    tweet.percents.b
                  }%" data-vote="c">${tweet.poll[1]} 
							</div>
								<div id="percentage3">${tweet.percents.c}%</div>
							</div><div class="bargraph">
									<div id="bar3" class="bar" style="flex-basis: ${
                    tweet.percents.c
                  }%" data-vote="b">${tweet.poll[2]} 
							</div>
							<div id="percentage4">${tweet.percents.d}%</div>
						</div><div class="bargraph">
								<div id="bar4" class="bar" style="flex-basis: ${
                  tweet.percents.d
                }%" data-vote="d">${tweet.poll[3]} 
						</div>
							<div id="percentage1">${tweet.percents.d}%</div>
						</div>
						<div>${tweet.total} votes</div>
						`;
}
function displayReactions() {
  return `<div id="reactions" class="btn-group mr-2">
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-message-outline"
                            aria-label="reply"
                        ></button>
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-twitter-retweet"
                            aria-label="retweet"
                        ></button>
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-heart-outline"
                            aria-label="like"
                            style=""
                        ></button>
                        <button
                            type="button"
                            class="btn btn-secondary mdi mdi-upload"
                            aria-label="share"
                        ></button>
                    </div>
					</div>
				</div>`;
}
function remember() {
  localStorage.removeItem('tweets');
  localStorage.setItem('tweets', JSON.stringify(tweets));
  tweets = JSON.parse(localStorage.getItem('tweets'));
}
// display from tweets array
function displayTweets() {
  const content = tweets
    .map(
      (tweet, index) => `
						${displayTweetHead()}
					<div class="pl-2" data-index="${index}"> 
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
						${tweet.img ? displayImg(tweet) : ''}						
						${tweet.isPolling ? displayPoll(tweet, index) : ''}						
						${tweet.isVoted ? displayVoteResult(tweet) : ''}
						${displayReactions()}
		`
    )
    .join('');
  main.innerHTML = content;
  remember();
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
  emojiPopup.classList.add('hide');
  displayTweets();
}

// EventListeners----------------------------------------
// Exit button
exitBtns.forEach(exitBtn => exitBtn.addEventListener('click', togglePopup));
// img button
uploadPic.addEventListener('input', handleFileSelect);
// gif button
gifBtn.addEventListener('click', searchGif);
// Poll button
pollBtn.addEventListener('click', insertPoll);
// main
main.addEventListener('click', vote);

// gif------------------------------------------------------
switchGif.addEventListener('change', gifToggle);
searchGifBtn.addEventListener('click', getGifs);
// emoji---------------------------------------------------
// load emoji
document.addEventListener('DOMContentLoaded', loadEmoji);
// emoji button
emojiBtn.addEventListener('click', browseEmoji);
// search emoji
inputEmoji.addEventListener('keyup', searchEmojis);
categoryEmoji.forEach(i => i.addEventListener('click', searchEmojis));
// Add selected emoji to textarea
emojiArea.addEventListener('click', addEmoji);
// emoji---------------------------------------------------
// tweet button
tweetButton.addEventListener('click', tweeting);
// load previous tweets
document.addEventListener('DOMContentLoaded', displayTweets);
