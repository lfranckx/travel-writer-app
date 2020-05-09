/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';

export const nullArticle = {
    author: {},
    tags: [],
};

const ArticleContext = React.createContext({
    article: nullArticle,
    articleList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setArticle: () => {},
    clearArticle: () => {},
    setArticleList: () => {}
});
export default ArticleContext;

export class ArticleProvider extends Component {
    state = {
        article: nullArticle,
        articleList: [],
        error: null
    };

    setArticleList = articleList => {
        this.setState({ articleList });
    }

    setError = error => {
        console.error(error);
        this.setState({ error });
    }

    clearError = () => {
        this.setState({ error: null });
    }

    setArticle = article => {
        this.setState({ article });
    }

    clearArticle = () => {
        this.setArticle(nullArticle);
    }
    
    render() {
        const value = {
            article: this.article,
            articleList: this.state.articleList,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setArticle: this.setArticle,
            clearArticle: this.clearArticle,
            setArticleList: this.setArticleList,
        };
        
        return (
            <ArticleContext.Provider value={value}>
                {this.props.children}
            </ArticleContext.Provider>
        );
    }   
}