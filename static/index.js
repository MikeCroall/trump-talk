var socket = io();
var count = 0;
var wordCounts = {};
var hashtagCounts = {};
var stopList = ["", "rt", "to", "the", "and", "of", "a", "for", "this", "on", "is", "in", "by", "be", "from", "i", "you", "he", "has",
"his", "him", "her", "hers", "see", "with", "that", "trump", "who", "will", "was", "an", "about", "&amp;", "we", "as", "it"];

socket.on('tweet', function(tweet) {
    count += 1;
    $('#tweet-count').html('&nbsp;' + count + '&nbsp;');
    tweet.replace("http", " http").replace(/[. |, |\n|\r|:|-|!]/," ").split(" ").forEach(function(word) {
        if (word.startsWith("#")) {
            // HASHTAG ROUTE
            if (hashtagCounts.hasOwnProperty(word)) {
                hashtagCounts[word] ++;
            } else {
                hashtagCounts[word] = 1;
            }
        } else if (-1 === $.inArray(word.toLowerCase(), stopList)) {
            // NORMAL (non-ignored) WORD ROUTE
            if (wordCounts.hasOwnProperty(word)) {
                wordCounts[word]++;
            } else {
                wordCounts[word] = 1;
            }
        }
    });
});

function updateCountDisplay() {
    $(".clm").empty();

    var wordsInOrder = Object.keys(wordCounts).sort(function(a, b) {
        return wordCounts[b] - wordCounts[a]
    });
    var wordsList = $("<ol>");
    for (var i = 0; i < Math.min(wordsInOrder.length, 10); i++) {
        var item = $("<li>");
        item.html(wordsInOrder[i]);
        wordsList.append(item);
    }
    $("#word-clm").append(wordsList);

    var hashtagsInOrder = Object.keys(hashtagCounts).sort(function(a, b) {
        return hashtagCounts[b] - hashtagCounts[a]
    });
    var hashtagList = $("<ol>");
    for (var i = 0; i < Math.min(hashtagsInOrder.length, 10); i++) {
        var item = $("<li>");
        item.html(hashtagsInOrder[i]);
        hashtagList.append(item);
    }
    $("#hashtag-clm").append(hashtagList);
}

window.setInterval(updateCountDisplay, 1000);
