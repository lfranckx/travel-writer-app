/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import ArticleContext from '../../Contexts/ArticleContext'; 
import './ArticlePage.css';

export default class ArticlePage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = ArticleContext

    componentDidMount() {
        const { articleId } = this.props.match.params;
        this.context.clearError();
    }

    componentWillUnmount() {
        this.context.clearArticle();
    }

    renderArticle() {
        const { article } = this.context;
        return (
            <>
                
            </>
        );
    }
}
