const Sentiment = require("sentiment");
const SentimentSpanish = require("sentiment-spanish");
const SentimentTurkish = require("sentiment-turkish");
const SentimentFrench = require("sentiment-french");
const SentimentPortuguese = require("sentiment-ptbr");
// const SentimentChinese = require("sentiment-zh_cn");
const SentimentSwedish = require("sentiment-swedish");
const SentimentPolish = require("sentiment-polish");
// const SentimentGerman = require("ml-sentiment")({ lang: "de" });
const EmojiSentiment = require("wink-sentiment");
const NaturalAnalyzer = require("natural").SentimentAnalyzer;
const stemmer = require("natural").PorterStemmer;

const getSentimentScore = (text, lang) => {
  if (lang === "en") {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);
    return result.score;
  } else if (lang === "es") {
    const result = SentimentSpanish(text);
    return isNaN(result.score) ? null : result.score;
  } else if (lang === "tr") {
    const result = SentimentTurkish(text);
    return isNaN(result.score) ? null : result.score;
  } else if (lang === "fr") {
    const result = SentimentFrench(text);
    return isNaN(result.score) ? null : result.score;
  } else if (lang === "pt") {
    const result = SentimentPortuguese(text);
    return isNaN(result.score) ? null : result.score;
  } else if (lang === "sv") {
    const result = SentimentSwedish(text);
    return isNaN(result.score) ? null : result.score;
  } else if (lang === "pl") {
    const result = SentimentPolish(text);
    return isNaN(result.score) ? null : result.score;
  } else if (lang === "pl") {
    const result = SentimentPolish(text);
    return isNaN(result.score) ? null : result.score;
  }
  // else if (lang === "zh-cn") {
  //   const result = SentimentChinese(text);
  //   return isNaN(result.score) ? null : result.score;
  // }
  else if (lang === "it") {
    const analyzer = new NaturalAnalyzer("Italian", stemmer, "pattern");
    const textArray = text.split(" ");
    return analyzer.getSentiment(textArray);
  } else if (lang === "nl") {
    const analyzer = new NaturalAnalyzer("Dutch", stemmer, "pattern");
    const textArray = text.split(" ");
    return analyzer.getSentiment(textArray);
  } else {
    const result = EmojiSentiment(text);
    return isNaN(result.score) ? null : result.score;
  }

  // else {
  //   const result = MultiLangSentiment(text, lang);
  //   return result.score;
  // }
};

module.exports = getSentimentScore;
