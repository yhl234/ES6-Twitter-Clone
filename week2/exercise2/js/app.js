// STEP 1 - Change your avatar URL here
const AVATAR_URL = 'https://avatars3.githubusercontent.com/u/43277189?v=4';
const myAvatar = document.querySelectorAll('.myAvatar');
myAvatar.forEach(img => (img.src = AVATAR_URL));

// STEP 2 - Declare constant imgGifPoll
const imgGifPoll = document.querySelector('#imgGifPoll');

// STEP 4 - Create a function called handleFileSelect
function handleFileSelect(e) {
  const reader = new FileReader();
  reader.addEventListener('load', evn => {
    imgGifPoll.innerHTML = `<img id="tweetImg" class="thumb" src="${evn.target.result}" data-src="${evn.target.result}" style="width:100%"/>`;
  });
  // read the image file as a data url base
  reader.readAsDataURL(e.target.files[0]);
}

// STEP 3 - Add a change event listener to #uploadPic
const uploadPic = document.querySelector('#uploadPic');
uploadPic.addEventListener('change', handleFileSelect);
// STEP 5 - Submit hosted url in Blackboard

// copy from lab1
const tweetButton = document.querySelector('#tweet');
const textArea = document.querySelector('#textarea');
const main = document.querySelector('main');
const tweets = [];

// separate tweet to text, hashtag and no hashtag, and store into object
function hashtag(searchText) {
  const regex = /#(\w+)/g;
  const hashtags = searchText.match(regex);
  const tweetImg = document.querySelector('#tweetImg').dataset.src;

  // store an empty array if there is no hashtag
  if (!hashtags) {
    const tweet = {
      tweet: searchText,
      hashtag: [],
      img: tweetImg,
    };
    return tweet;
  }
  // get the text before #
  const index = searchText.indexOf('#');
  const text = searchText.slice(0, index).trim();
  // remove # before hashtag
  const hashtag = hashtags.map(hashtag => hashtag.replace('#', ''));
  const tweet = {
    tweet: text,
    hashtag,
    img: tweetImg,
  };
  return tweet;
}

// display, map out the object
// hashtag links: map the noHashtag array in object
function display(tweets) {
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
						<img id="tweetImg" class="thumb" src="${tweet.img}"  style="width:100%"/>
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
function tweeting(e) {
  e.preventDefault();
  const tweet = hashtag(textArea.value);
  tweets.unshift(tweet);
  textArea.value = '';
  imgGifPoll.innerHTML = '';
  display(tweets);
}
tweetButton.addEventListener('click', tweeting);
