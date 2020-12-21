const SentimentEnglish = require("sentiment");
const SentimentSpanish = require("sentiment-spanish");
const SentimentTurkish = require("sentiment-turkish");
const SentimentFrench = require("sentiment-french");
const SentimentPortuguese = require("sentiment-ptbr");
const SentimentSwedish = require("sentiment-swedish");
const SentimentPolish = require("sentiment-polish");
const EmojiSentiment = require("wink-sentiment");
const NaturalAnalyzer = require("natural").SentimentAnalyzer;
const stemmer = require("natural").PorterStemmer;

const getSentimentScore = (text, lang) => {
  let result = {};
  switch (lang) {
    case "en":
      const sentiment = new SentimentEnglish();
      result = sentiment.analyze(text);
      break;
    case "es":
      result = SentimentSpanish(text);
      break;
    case "tr":
      result = SentimentTurkish(text);
      break;
    case "fr":
      result = SentimentFrench(text);
      break;
    case "pt":
      result = SentimentPortuguese(text);
      break;
    case "sv":
      result = SentimentSwedish(text);
      break;
    case "pl":
      result = SentimentPolish(text);
      break;
    case "it":
      const itAnalyzer = new NaturalAnalyzer("Italian", stemmer, "pattern");
      const itTextArray = text.split(" ");
      result.score = itAnalyzer.getSentiment(itTextArray);
      break;
    case "nl":
      const nlAnalyzer = new NaturalAnalyzer("Dutch", stemmer, "pattern");
      const nlTextArray = text.split(" ");
      result.score = nlAnalyzer.getSentiment(nlTextArray);
      break;
    default:
      result = EmojiSentiment(text);
  }
  return isNaN(result.score) ? null : result.score;
};

module.exports = getSentimentScore;
