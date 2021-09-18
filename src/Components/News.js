import React, { useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
   const [articles, setArticles] = useState([])
   const [loading, setLoading] = useState(true)
   const [page, setPage] = useState(1)
   const [totalResults, setTotalResults] = useState(0)
    const capitalLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const updateNews= async()=> {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63521d0ba98c4d58b015ec3a716a4c1b&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    // prevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63521d0ba98c4d58b015ec3a716a4c1b&page=${this.state.page-1}&pageSize=${props.pageSize}`;
        // this.setState({loading:true});    
        // let data = await fetch(url);
        //     let ParsedData = await data.json();
        //     this.setState({
        //         page: this.state.page - 1,
        //         articles:ParsedData.articles,
        //         loading:false
        // })
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();

    // }
    // nextClick = async () => {
        //     if(!(this.state.page + 1> Math.ceil(this.state.totalResults/props.pageSize)) ){
        //         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63521d0ba98c4d58b015ec3a716a4c1b&page=${this.state.page+1}&pageSize=${props.pageSize}`;
        //         this.setState({loading:true});
        //         let data = await fetch(url);
        //         let ParsedData = await data.json();
        //         this.setState({
        //             page: this.state.page + 1,
        //             articles:ParsedData.articles,
        //             loading:false
        //     })
        // }
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // }
    const fetchMoreData = async() => {
        // this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63521d0ba98c4d58b015ec3a716a4c1b&page=${page+1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setPage(page +1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        
      };
    // const componentDidMount= async()=> {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63521d0ba98c4d58b015ec3a716a4c1b&page=1&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let ParsedData = await data.json();
        // this.setState({ articles: ParsedData.articles, totalResults: ParsedData.totalResults, loading: false })
//    }
useEffect(() => {
    document.title = `${capitalLetter(props.category)} - NewsJunkie`;

    updateNews();
}, [])

    
        return (
            <div className="text-center container my-3">
                <h1 style={{ margin: '38px', marginTop:'90px' }}>NewJunkie - Top {capitalLetter(props.category)} Headlines</h1>
                 {loading && <Spinner />} 
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore= {articles.length !== totalResults}
                    loader= {<Spinner />}
                >
                    <div className="row">
                        {articles.map((element) => {
                            return <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.prevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextClick}>Next &rarr;</button>
                </div> */}

            </div>
        )
    
}
News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: 'science',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
