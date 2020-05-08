/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import ArticleListItem from '../ArticleListItem/ArticleListItem';
import ArticleListContext from '../../Contexts/ArticleListContext/ArticleListContext';
import dummystore from '../../dummystore';

class MainPage extends Component {
    static contextType = ArticleListContext;

    renderArticles() {
        const { articlesList = [] } = dummystore;
        return articlesList.map(article => 
            <ArticleListItem 
                key={article.id}
                article={article}
            />
        );
    }

    render() {
        const { error } = this.context;
        return (
            <section>
                {error
                    ? <p className='error' >There was an error try again</p>
                    : this.renderThings()
                }
            </section>
        );
    }
}

export default MainPage;