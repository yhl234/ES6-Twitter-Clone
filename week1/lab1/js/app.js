const tweetButton = document.querySelector("#tweet");
const textArea = document.querySelector("#exampleFormControlTextarea1");
const main = document.querySelector("#main");
const tweets = [];

tweetButton.addEventListener("click", tweeting);
function tweeting(e) {
	e.preventDefault();
	tweet = hashtag(textArea.value);
	tweets.unshift(tweet);
	textArea.value = "";
	display(tweets);
}

// separate tweet to text, hashtag and no hashtag, and store into object
function hashtag(searchText) {
	let regex = /\#(\w+)/g;
	const hashtags = searchText.match(regex);
	//store an empty array if there is no hashtag
	if (!hashtags) {
		const tweet = {
			tweet: searchText,
			hashtag: []
		};
		return tweet;
	} else {
		// get the text before #
		const index = searchText.indexOf("#");
		const text = searchText.slice(0, index).trim();
		// remove # before hashtag
		const hashtag = hashtags.map(hashtag => hashtag.replace("#", ""));
		const tweet = {
			tweet: text,
			hashtag: hashtag
		};
		return tweet;
	}
}

//display, map out the object
//hashtag links: map the noHashtag array in object
function display(tweets) {
	let content = tweets
		.map(tweet => {
			return `
				<div class="fb container row justify-content-start border rounded p-3 mt-3">
					<img
						id="avatar"
						src="https://avatars3.githubusercontent.com/u/43277189?v=4"
						alt=""
					/>
					<div class="pl-2"> 
						<div>Louis L <span class="text-secondary ">@yhl123</span></div>
						<div class="mt-1">${tweet.tweet} 
						${tweet.hashtag
							.map(item => {
								return `
						<a href=https://twitter.com/hashtag/${item}?src=hashtag_click>#${item}</a>
						`;
							})
							.join("")}
						</div>
						<div>
							<span class="mdi mdi-comment-outline pt-3 pr-3 pb-3"></span>
							<span class="mdi mdi-twitter-retweet p-3"></span>
							<span class="mdi mdi-upload p-3"></span>
							<span class="mdi mdi-heart p-3"></span>
						</div>
					</div>
				</div>

		`;
		})
		.join("");
	main.innerHTML = content;
}
