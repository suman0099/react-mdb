import React, { Component } from "react";

import {
    API_URL,
    API_KEY,
    IMAGE_BASE_URL,
    POSTER_SIZE,
    BACKDROP_SIZE
} from "../../config";
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";
import "./Home.css";

class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ""
    };

    componentDidMount() {
        this.setState({ loading: true });
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
    }

    loadMoreItems = () => {
        let endpoint = "";
        this.state({ loading: true });

        if (this.state.searchTerm === "") {
            //Not searching anything so get the most popular movies
            //prettier-ignore
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${
                this.state.searchTerm
            }&page=${this.state.currentPage + 1}`;
        }
        this.fetchItems(endpoint);
    };

    fetchItems = endpoint => {
        fetch(endpoint)
            .then(result => result.json()) // convert raw data to json
            .then(result => {
                this.setState({
                    movies: [...this.state.movies, ...result],
                    heroImage: this.state.heroImage || result.results[0],
                    loading: false,
                    currentPage: result.page,
                    totalPages: result.totalPages
                });
            });
    };

    render() {
        return (
            <div className="rmdb-home">
                <HeroImage />
                <SearchBar />
                <FourColGrid />
                <Spinner />
                <LoadMoreBtn />
            </div>
        );
    }
}

export default Home;
