const tweetButton = document.querySelector("#tweet");
const textArea = document.querySelector("#exampleFormControlTextarea1");
const main = document.querySelector("#main");
const tweets = [];
tweetButton.addEventListener("click", tweeting);
function tweeting(e) {
	e.preventDefault();
	tweet = {
		tweet: document.querySelector("#exampleFormControlTextarea1").value
	};
	tweets.unshift(tweet);
	textArea.value = "";
	console.log(tweets);
	display(tweets);
}
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
						<div class="mt-1">${tweet.tweet}</div>
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
