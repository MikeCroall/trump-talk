var socket = io();
var count = 0;
var wordCounts = {};
var hashtagCounts = {};
var stopList = ['', ' ', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]

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
