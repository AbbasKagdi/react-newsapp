import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import Exhausted from './Exhausted'
import ErrorPage from './ErrorPage'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [apiQuota, setApiQuota] = useState(1);
  const [errors, setErrors] = useState({ error: false, message: null });

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const updateNews = async (givenPage) => {
    // It displays the loading animation
    props.setProgress(10);
    setLoading(true);

    // top headlines by News API
    let newsSourceUrl = "https://newsapi.org/v2/top-headlines?"
      + "page=" + givenPage
      + "&country=" + props.country
      + "&pageSize=" + props.pageSize
      + "&category=" + props.category
      + "&apiKey=" + props.apiKey;
    // console.log(newsSourceUrl)

    try {
      await fetch(newsSourceUrl)
        .then((res) => res.json())
        .then((json) => {
          // API Quota Exceeded
          if (json.code === "rateLimited") {
            setApiQuota(0);
            setErrors(true, "API Quota Exceeded");
          }
          else {
            props.setProgress(70);
            setApiQuota(1)
            setArticles(json.articles)
            setLoading(false)
            setTotalResults(json.totalResults)
            setErrors(false, null)
            props.setProgress(100);
          }
        })
    }
    catch (e) {
      console.log(e);
      setErrors(true, e.message);
    }
  }

  useEffect(() => {
    // initialises the page
    console.log("DOM mounted");
    document.title = capitalize(props.category) + " | NewsMonkey"
    // setPage(1);
    updateNews(1);
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    let url = "https://newsapi.org/v2/top-headlines?"
    + "country=" + props.country 
    + "&category=" + props.category 
    + "&apiKey=" + props.apiKey 
    + "&page=" + (page + 1) 
    + "&pageSize=" + props.pageSize;

    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  if (apiQuota === 0) {
    return <Exhausted />
  }
  else if (errors.error) {
    return <ErrorPage message={errors.message} />
  }
  else return (
    <>
      <div className='container my-5 text-center'><br /><h1 className='my-5'>News Monkey - Top Headlines</h1></div>
      {loading && <Loading />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loading />} >
        <div className="container">
          <div className="row">
            {/* only render when not loading */}
            {!loading && articles.map((e) => {
              return <div className="col-md-4" key={e.url}>
                <NewsItem
                  title={e.title ? e.title.slice(0, 45) : ""}
                  description={e.description ? e.description.slice(0, 88) : ""}
                  imageUrl={e.urlToImage ? e.urlToImage : "https://cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg"}
                  newsUrl={e.url}
                  datePosted={e.publishedAt}
                  author={e.author ? e.author : "Anonymous"}
                  source={e.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: "in",
  pageSize: "5",
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
