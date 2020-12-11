class SentimentColorPicker {
  constructor({ live }) {
    this.colors = [
      "#fe9e9f",
      "#fcae98",
      "#fbbe91",
      "#face8a",
      "#c3da8c",
      "#8dd797",
      "#57d4a2",
      "#21d1ad",
    ];
    this.neutral = "#f9de83";
    this.sentimentRange = {
      max: 10,
      min: -10,
    };
    this.live = live;
  }

  getColor(sentiment) {
    if (sentiment === 0) return this.neutral;
    sentiment *= 10;
    let sentimentRange = this.sentimentRange;
    sentiment =
      sentiment >= 0
        ? Math.min(sentimentRange.max, sentiment)
        : Math.max(sentimentRange.min, sentiment);

    sentiment += Math.abs(sentimentRange.min);
    const range = sentimentRange.max - sentimentRange.min;
    const index = Math.floor((sentiment / range) * this.colors.length);
    return this.colors[index];
  }
}

export default SentimentColorPicker;
