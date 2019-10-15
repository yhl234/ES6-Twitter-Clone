# Twitter Clone

This is Twitter clone made by ES6 Javascript, Giphy api, emoji api and Mockaroo.

## ES6 feature

### 1. [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

```js
function displayImg(tweet) {
	return `
	<img id="tweetImg" class="thumb" src="${tweet.img}"style="width:100%"/>`;
}
```

### 2. [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

```js
categoryEmoji.forEach(i => i.addEventListener("click", searchEmojis));
```

### 3. [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

```js
async function loadEmoji() {
	const response = await fetch(
		"https://unpkg.com/emoji.json@12.1.0/emoji.json"
	);
	const data = await response.json();
	emojis.push(...data);
	const emojiHtml = emojis
		.map(
			emoji =>
				`<div class="emoji" data-char="${emoji.char}">${emoji.char}</div>`
		)
		.join("");
	emojiArea.innerHTML = emojiHtml;
}
```

### 4. [.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```js
async function loadEmoji() {
	const response = await fetch(
		"https://unpkg.com/emoji.json@12.1.0/emoji.json"
	);
	const data = await response.json();
	emojis.push(...data);
	const emojiHtml = emojis
		.map(
			emoji =>
				`<div class="emoji" data-char="${emoji.char}">${emoji.char}</div>`
		)
		.join("");
	emojiArea.innerHTML = emojiHtml;
}
```

### 5. [data-attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)

```js
function displayPoll(tweet, index) {
	return `
	<div class="poll flex-col" data-index="${index}">
		<button class="vote" data-selected="a">${tweet.poll[0]}</button>
		<button class="vote" data-selected="b">${tweet.poll[1]}</button>
		<button class="vote" data-selected="c">${tweet.poll[2]}</button>
		<button class="vote" data-selected="d">${tweet.poll[3]}</button>
	</div>`;
}
```

### 6. [Async Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

```js
async function getVotes() {
	const res = await fetch(
		"https://my.api.mockaroo.com/twitter_vote.json?key=bd549ad0"
	);
	const voteJson = await res.json();
	votes = await voteJson;
}
```

### 7. [Event Delegation](https://gomakethings.com/whats-the-difference-between-javascript-event-delegation-bubbling-and-capturing/)

```js
function addEmoji(e) {
	if (!e.target.matches("[data-char]")) {
		return;
	}
	e.preventDefault();
	textArea.value += e.target.dataset.char;
}
```

## Screenshot

![alt text](https://github.com/yhl234/19F-Adv-Client-Side-JavaScript/blob/master/screenshot.png "Demo screenshot")

## Known Bugs

1. Upload picture doesn't work in Safari.
2. Upload picture button fails in FireFox
