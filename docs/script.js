const TweetQuote = props => {
  return (
    React.createElement("a", {
      id: "tweet-quote",
      href:
      "https://www.twitter.com/intent/tweet?text=" +
      props.tweetQuote +
      "+-+" +
      props.tweetAuthor,

      target: "_blank" }, "Tweet quote"));




};

const NewQuote = props => {
  return (
    React.createElement("button", { id: "new-quote", onClick: props.getQuote }, "New quote"));



};

class Quotes extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", { id: "quote-box" },
      React.createElement("img", { id: "image", src: this.props.image }),
      React.createElement("h1", { id: "text" }, this.props.quote),
      React.createElement("p", { id: "author" }, this.props.author)));


  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      image: "",
      isHorizontal: window.innerWidth > window.innerHeight ? true : false };

    this.getQuote = this.getQuote.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  getQuote() {
    fetch("https://thesimpsonsquoteapi.glitch.me/quotes").
    then(response => {
      return response.json();
    }).
    then(data => {
      this.setState({
        quote: data[0].quote,
        author: data[0].character,
        image: data[0].image });

    });
  }
  updateWindowDimensions() {
    if (window.innerWidth > window.innerHeight) {
      this.setState({
        isHorizontal: true });

    } else {
      this.setState({
        isHorizontal: false });

    }
  }
  componentDidMount() {
    this.getQuote();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  render() {
    const tweetQuote = this.state.quote.split(" ").join("+");
    const tweetAuthor = this.state.author.split(" ").join("+");
    if (this.state.isHorizontal) {
      return (
        React.createElement("div", { id: "horizontal" },
        React.createElement(TweetQuote, { tweetQuote: tweetQuote, tweetAuthor: tweetAuthor }),
        React.createElement(Quotes, {
          quote: this.state.quote,
          author: this.state.author,
          image: this.state.image }),

        React.createElement(NewQuote, { getQuote: this.getQuote })));


    } else {
      return (
        React.createElement("div", { id: "vertical" },
        React.createElement(Quotes, {
          quote: this.state.quote,
          author: this.state.author,
          image: this.state.image }),

        React.createElement("div", null,
        React.createElement(TweetQuote, { tweetQuote: tweetQuote, tweetAuthor: tweetAuthor }),
        React.createElement(NewQuote, { getQuote: this.getQuote }))));



    }
  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("root"));