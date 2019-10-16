// Declare for Gifs upload
const gifBtn = document.querySelector('#gifBtn');
const searchGifBtn = document.querySelector('#searchGifBtn');
const switchGif = document.querySelector('#switchGif');
const gifPopup = document.querySelector('#gifPopup');
const gifsArea = document.querySelector('#gifsArea');

let gifs = [];
let selectedGif = '';
let isMoving = false;
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
function handleTweet(searchText) {
  const regex = new RegExp(/#(\w+)/gi);
  const tweet = {};
  const hashtags = searchText.match(regex);
  const tweetImg = imgGifPoll.querySelector('.thumb')
    ? imgGifPoll.querySelector('.thumb').dataset.src
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
    const poll = [
      document.querySelector('#pollchoice1').value,
      document.querySelector('#pollchoice2').value,
      document.querySelector('#pollchoice3').value,
      document.querySelector('#pollchoice4').value,
    ];
    const testPoll = poll.filter(e => e === '');
    if (testPoll.length === 0) {
      tweet.poll = poll;
      tweet.isPolling = true;
    }
  }

  if (hashtags) {
    tweet.tweet = hashtagToLink();
  } else {
    tweet.tweet = searchText;
  }

  function hashtagToLink() {
    let text = searchText;
    for (let i = 0; i < hashtags.length; i++) {
      text = text.replace(
        hashtags[i],
        `	<a href=https://twitter.com/hashtag/${hashtags[i]}?src=hashtag_click>${hashtags[i]}</a>`
      );
    }
    return text;
  }
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
    imgGifPoll.innerHTML = `<img class="thumb" src="${evn.target.result}" data-src="${evn.target.result}" style="width:100%"/>`;
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
  displayVoteResult(tweets[tweetsIndex]);
  tweets[tweetsIndex].isVoted = true;
  tweets[tweetsIndex].isPolling = false;
  displayTweets();
}
// display vote result

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
  if (tweet.img.includes('.gif')) {
    return `<video class="thumb" src="${tweet.img.replace(
      /200.gif/g,
      'giphy-loop.mp4'
    )}"  style="width:100%" autoplay/>`;
  }
  return `<img class="thumb" src="${tweet.img}"  style="width:100%"/>`;
}
function displayPoll(tweet, index) {
  return `<div class="poll flex-col" data-index="${index}">
						<button class="vote" data-selected="a">${tweet.poll[0]}</button>
						<button class="vote" data-selected="b">${tweet.poll[1]}</button>
						<button class="vote" data-selected="c">${tweet.poll[2]}</button>
						<button class="vote" data-selected="d">${tweet.poll[3]}</button>
					</div>`;
}
function displayVoteResult(tweet, index) {
  return `
		<div class="bargraph">
    	<div id="vote${index}bar1" class="bar ${
    tweet.selected === 'a' ? 'bg-primary' : ''
  }" style="flex-basis: ${tweet.percents.a}%" data-vote="a">${tweet.poll[0]} ${
    tweet.selected === 'a' ? '&check;' : ''
  } </div>
			<div id="percentage1">${tweet.percents.a}%</div>
		</div>
		<div class="bargraph">
			<div id="vote${index}bar2" class="bar ${
    tweet.selected === 'b' ? 'bg-primary' : ''
  }" style="flex-basis: ${tweet.percents.b}%" data-vote="b">${tweet.poll[1]} ${
    tweet.selected === 'b' ? '&check;' : ''
  } </div>
			<div id="percentage2">${tweet.percents.b}%</div>
		</div>
		<div class="bargraph">
			<div id="vote${index}bar3" class="bar ${
    tweet.selected === 'c' ? 'bg-primary' : ''
  }" style="flex-basis: ${tweet.percents.c}%" data-vote="c">${tweet.poll[2]}  ${
    tweet.selected === 'c' ? '&check;' : ''
  } 
		</div>
			<div id="percentage3">${tweet.percents.c}%</div>
		</div>
		<div class="bargraph">
			<div id="vote${index}bar4" class="bar ${
    tweet.selected === 'd' ? 'bg-primary' : ''
  }" style="flex-basis: ${tweet.percents.d}%" data-vote="d">${tweet.poll[3]}  ${
    tweet.selected === 'd' ? '&check;' : ''
  } 
		</div>
			<div id="percentage4">${tweet.percents.d}%</div>
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
								class="mdi btn btn-secondary heart"
								aria-label="like"
						></button>
						<button
								type="button"
								class="btn btn-secondary mdi mdi-upload"
								aria-label="share"
						></button>
				</div>
			</div>
		</div>`; // end container;
}
function animateReactions() {
  const likes = document.querySelectorAll('.heart');
  likes.forEach(like => {
    like.addEventListener('click', e =>
      e.target.classList.toggle('is_animating')
    );
    like.addEventListener('animationend', e => {
      e.target.classList.remove('is_animating');
      e.target.classList.toggle('liked');
    });
  });
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
					<div class="pl-2 col" data-index="${index}"> 
						<div>Louis L <span class="text-secondary ">@yhl123</span></div>
						<div class="mt-1">
						${tweet.tweet} 
						${tweet.img ? displayImg(tweet) : ''}	
						${tweet.isPolling ? displayPoll(tweet, index) : ''}
						${tweet.isVoted ? displayVoteResult(tweet, index) : ''}
						</div>
						${displayReactions()}
		`
    )
    .join('');
  main.innerHTML = content;
  remember();
  animateReactions();
}

// Store tweet to tweets array and clean textarea and preview
// hashtag links: map the noHashtag array in object
function tweeting(e) {
  e.preventDefault();
  const tweet = handleTweet(textArea.value);
  if (tweet.tweet === '' && !tweet.poll && !tweet.img) {
    return;
  }
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
