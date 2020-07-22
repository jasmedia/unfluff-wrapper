// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var _, cache, candiateWords, fs, getFilePath, path, removePunctuation, stopwords;
  path = require('path');
  fs = require('fs');
  _ = require('lodash');
  cache = {};
  getFilePath = function (language) {
    return path.join(__dirname, '..', 'data', 'stopwords', 'stopwords-' + language + '.txt');
  };
  module.exports = stopwords = function (content, language) {
    var count, filePath, overlappingStopwords, stopWords, strippedInput, words;
    if (null == language)
      language = 'en';
    filePath = getFilePath(language);
    if (!fs.existsSync(filePath)) {
      console.error("WARNING: No stopwords file found for '" + language + "' - defaulting to English!");
      filePath = getFilePath('en');
    }
    if (cache.hasOwnProperty(language)) {
      stopWords = cache[language];
    } else {
      stopWords = fs.readFileSync(filePath).toString().split('\n').filter(function (s) {
        return s.length > 0;
      });
      cache[language] = stopWords;
    }
    strippedInput = removePunctuation(content);
    words = candiateWords(strippedInput);
    overlappingStopwords = [];
    count = 0;
    _.each(words, function (w) {
      count += 1;
      if (stopWords.indexOf(w.toLowerCase()) > -1)
        return overlappingStopwords.push(w.toLowerCase());
    });
    return {
      wordCount: count,
      stopwordCount: overlappingStopwords.length,
      stopWords: overlappingStopwords
    };
  };
  removePunctuation = function (content) {
    return content.replace(/[\|\@\<\>\[\]\"\'\.,-\/#\?!$%\^&\*\+;:{}=\-_`~()]/g, '');
  };
  candiateWords = function (strippedInput) {
    return strippedInput.split(' ');
  };
}.call(this);