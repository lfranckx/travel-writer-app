/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import ArticlesListItem from '../../Components/ArticlesListItem/ArticlesListItem';
import ArticleContext from '../../Contexts/ArticleContext';
import dummystore from '../../dummystore';
import './MainPage.css';

class MainPage extends Component {
    static contextType = ArticleContext;

    componentDidMount() {
        this.context.clearError();
        this.context.setArticlesList(dummystore);
    }

    renderArticles() {
        const { articlesList = [] } = this.context;
        if (!articlesList) {
            return <div className="loading">Loading...</div>;        
        }
        console.log('renderArticles() articlesList: ', articlesList);
        return articlesList.map(article => 
            <ArticlesListItem 
                key={article.id}
                article={article}
            />
        );
    }

    render() {
        const { error } = this.context;
        console.log('mainpage context', this.context);
        if (!this.context.articlesList) {
            return <div className="loading">Loading...</div>;        
        }
        return (
            <section>
                <h2>Stories</h2>
                {error
                    ? <p className='error' >There was an error try again</p>
                    : this.renderArticles()
                }
            </section>
        );
    }
}

export default MainPage;