/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';

export const nullArticle = {
    author: {},
    tags: [],
};

const ArticleContext = React.createContext({
    article: nullArticle,
    articlesList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setArticle: () => {},
    clearArticle: () => {},
    setArticlesList: () => {}
});
export default ArticleContext;

export class ArticleProvider extends Component {
    state = {
        article: nullArticle,
        articlesList: [],
        error: null
    };

    setArticlesList = articlesList => {
        this.setState({ articlesList });
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
            articlesList: this.state.articlesList,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setArticle: this.setArticle,
            clearArticle: this.clearArticle,
            setArticlesList: this.setArticlesList,
        };
        
        return (
            <ArticleContext.Provider value={value}>
                {this.props.children}
            </ArticleContext.Provider>
        );
    }   
}