import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import Exhausted from './Exhausted'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: "9",
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props) {
    super(props);

    // set title as per category
    document.title = this.capitalize(props.category) + " | NewsMonkey"

    // set default values here
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount() {
    console.log("CDM triggered");
    this.setState({page: 1});
    this.updateNews();
  }

  async updateNews(){
    // top headlines by News API
    let newsSourceUrl = "https://newsapi.org/v2/top-headlines?country="
      + this.props.country
      + "&page=" + this.state.page
      + "&pageSize=" + this.props.pageSize
      + "&category=" + this.props.category
      + "&apiKey=" + this.props.apiKey;

    try {
      // It displays the loading animation
      this.setState({loading: true});

      await fetch(newsSourceUrl)
        .then((res) => res.json())
        .then((json) => {
          // API Quota Exceeded
          if(json.code === "rateLimited"){
            this.setState({
              apiQuota: 0
            });
          }
          else{
            this.setState({
              apiQuota: 1,
              articles: json.articles,
              loading: false,
              totalResults: json.totalResults
            });
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  handlePrev = async () => {
    // use await to prevent inconsistent page rendering
    await this.setState({page: this.state.page - 1});
    this.updateNews();
  }

  handleNext = async () => {
    // use await to prevent inconsistent page rendering
    await this.setState({page: this.state.page + 1});
    this.updateNews();
  }

  render() {
    if(this.state.apiQuota === 0){
      return <Exhausted />
    }
    else if (this.state.loading) {
      // console.log("still waiting inside render");
      return <Loading />
    }
    else return (
      <>
        <div className="container my-3">
          <h1 className='my-5'>News Monkey - Top Headlines</h1>
          <div className="row">
            {/* only render when not loading */}
            {!this.state.loading && this.state.articles.map((e) => {
              return <div className="col-md-4" key={e.url}>
                <NewsItem 
                  title = {e.title ? e.title.slice(0, 45) : ""} 
                  description = {e.description ? e.description.slice(0, 88) : ""} 
                  imageUrl = {e.urlToImage ? e.urlToImage : "https://cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg"} 
                  newsUrl = {e.url} 
                  datePosted = {e.publishedAt} 
                  author = {e.author? e.author : "Anonymous"} 
                  source = {e.source.name} />
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
          </div>
        </div>
      </>
    )
  }
}

export default News