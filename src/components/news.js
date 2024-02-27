import React, { Component } from 'react'
import Newsitem from './newsitem'
import Spinner from './spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
    static defaultProps={
        country:"in",
        pageSize:8,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    capitalized=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    constructor(props){
        super(props);
        this.state={
            articles : [],
            loading : true,
            page : 1
        }
        document.title=`${this.capitalized(this.props.category)}-NewsExpress`;
    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ff0b2045e914138927cb5ca114f1de5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        //`https://newsapi.org/v2/top-headlines?page=${this.state.page}&category=${this.props.category}&country=${this.props.country}&apiKey=3ff0b2045e914138927cb5ca114f1de5&pageSize=5`;
        this.setState({loading:true});
        let da=await fetch(url);
        let data=await da.json();
        console.log(data);
        console.log(this.state.totalResults,this.state.page);
        this.setState({
            articles : data.articles,
            totalResults: data.totalResults,
            loading:false,
        });
    }

    shownextnews = async() =>{
        // this.componentDidMount();
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ff0b2045e914138927cb5ca114f1de5&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //`https://newsapi.org/v2/top-headlines?page=${this.state.page}&category=${this.props.category}&country=${this.props.country}&apiKey=3ff0b2045e914138927cb5ca114f1de5&pageSize=5`;
        this.setState({loading:true});
        let da=await fetch(url);
        let data=await da.json();
        console.log(data);
        console.log(this.state.totalResults,this.state.page);
        this.setState({
            articles : data.articles,
            totalResults: data.totalResults,
            loading:false,
            page:this.state.page+1
        });
    }
    showprevnews = async() =>{
        // this.componentDidMount();
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ff0b2045e914138927cb5ca114f1de5&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        //`https://newsapi.org/v2/top-headlines?page=${this.state.page}&category=${this.props.category}&country=${this.props.country}&apiKey=3ff0b2045e914138927cb5ca114f1de5&pageSize=5`;
        this.setState({loading:true});
        let da=await fetch(url);
        let data=await da.json();
        console.log(data);
        console.log(this.state.totalResults,this.state.page);
        this.setState({
            articles : data.articles,
            totalResults: data.totalResults,
            loading:false,
            page:this.state.page-1
        });
    }
    fetchMoreData = async() => {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ff0b2045e914138927cb5ca114f1de5&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //`https://newsapi.org/v2/top-headlines?page=${this.state.page}&category=${this.props.category}&country=${this.props.country}&apiKey=3ff0b2045e914138927cb5ca114f1de5&pageSize=5`;
        // this.setState({loading:true});
        let da=await fetch(url);
        let data=await da.json();
        console.log(data);
        console.log(this.state.totalResults,this.state.page);
        this.setState({
            articles : this.state.articles.concat(data.articles),
            totalResults: data.totalResults,
            page: this.state.page+1
        });
      };

  render() {
    return (
        <div className="container my-3">
            <h1 className="text-center">NewsExpress - Top {this.capitalized(this.props.category)} Headlines</h1>
            {/* {this.state.loading && <Spinner/>} */}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length!==this.state.totalResults}
                loader={<Spinner></Spinner>}
                >
                <div className="container">
                <div className="row">
                    {this.state.articles?.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title} description={element.description} imgurl={element.urlToImage
    } newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        })
                    }
                </div>
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between my-5">
                <button type="button" disabled={this.state.page<=1} onClick={this.showprevnews} className="btn btn-danger">&larr; previous</button>
                <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/5)} onClick={this.shownextnews} className="btn btn-danger">Next (${this.state.page}) &rarr;</button>
            </div> */}
        </div>
    )
  }
}
