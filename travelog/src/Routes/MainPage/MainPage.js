/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import ArticleListItem from '../../Components/ArticleListItem/ArticleListItem';
import ArticleContext from '../../Contexts/ArticleContext';
import dummystore from '../../dummystore';

class MainPage extends Component {
    static contextType = ArticleContext;

    componentDidMount() {
        console.log('MainPage did mount');
        
        this.context.clearError();
        this.context.setArticleList(dummystore);
    }

    renderArticles() {
        const { articlesList = [] } = this.context;
        return articlesList.map(article => 
            <ArticleListItem 
                key={article.id}
                article={article}
            />
        );
    }

    render() {
        const { error } = this.context;
        console.log('mainpage context', this.context);
        
        return (
            <section>
                <h2>Articles</h2>
                {error
                    ? <p className='error' >There was an error try again</p>
                    : this.renderThings()
                }
            </section>
        );
    }
}

export default MainPage;