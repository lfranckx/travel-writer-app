import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import './ArticleListItem.css';

export default class ArticleListItem extends Component {
    render() {
        const { article } = this.props;
        return (
            <article>
                <div className="author-container">
                    <div>{article.author}</div>
                    <div>{article.date}</div>
                </div>
                <div class="article-container">
                    <h3>{article.title}</h3>
                    <h4>{article.description}</h4>
                    <a href="/">read more</a>
                </div>
                <div></div>
            </article>
        )
    }
}