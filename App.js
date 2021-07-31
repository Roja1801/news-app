import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import './App.css';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
const alankey = '696ae01e00b49cb5acbc38a4809856f22e956eca572e1d8b807a3e2338fdd0dc/stage';


const App = () => {
  const [activeArticle, setActiveArticle] = useState(-1);
  const [newsArticles, setNewsArticles] = useState([]);
  const classes = useStyles();



  useEffect(() => {
    alanBtn({
      key:alankey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(-1)
        }else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      }
    })
  },[])

  return (
    <div >
      <div className={classes.top}>
      {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
      <div className={classes.logoContainer}>
        <img src='https://cdn.dribbble.com/users/1107334/screenshots/6919786/attachments/1469358/alan.png?compress=1&resize=400x300' className={classes.alanLogo} alt="logo"/>
      </div>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  )
}

export default App

