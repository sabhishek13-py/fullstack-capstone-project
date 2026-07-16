// Import the Natural package
import natural from "natural";

// Create a tokenizer
const tokenizer = new natural.WordTokenizer();

// Create the sentiment analyzer
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer(
    "English",
    stemmer,
    "afinn"
);

// Example text
const text = "This gift is absolutely amazing!";

// Tokenize the text
const tokens = tokenizer.tokenize(text);

// Analyze sentiment
const score = analyzer.getSentiment(tokens);

// Print the results
console.log("Review:", text);
console.log("Tokens:", tokens);
console.log("Sentiment Score:", score);

if (score > 0) {
    console.log("Sentiment: Positive");
} else if (score < 0) {
    console.log("Sentiment: Negative");
} else {
    console.log("Sentiment: Neutral");
}
