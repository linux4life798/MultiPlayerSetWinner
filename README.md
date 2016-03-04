MultiPlayerSetWinner
====================

Allows you to cheat when playing the game on <a href="http://multiplayerset.com">MultiPlayerSet.com</a>.

When activated, the script analyzes the current cards, finds a good set, and makes the selection.


Instructions
============


### Preparation

Add a bookmark in browser(tested in Chromium) that has the following URL:
```js
javascript:(function(){ $.getScript('https://rawgithub.com/linux4life798/MultiPlayerSetWinner/master/do.js'); })();
```

### Usage

When playing a game on <a href="http://multiplayerset.com">MultiPlayerSet.com</a>, click on the bookmark previously made to load the script.
Then, to have the browser make the move for you, click on the textbox at the bottom of the page that is labeled "Share this URL to invite other people to join this game:".
If a set is possible, you should see the set member cards fly off the board and your score increase.

## Notes

Ideally, you would host your own `do.js` and chnge your bookmark to point to your own server, since the above depends on the rawgithub.com machines.
