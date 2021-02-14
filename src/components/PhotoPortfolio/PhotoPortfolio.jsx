/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React, { useEffect } from 'react';
import { reaction, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { 
  Route, 
  Switch,
  useRouteMatch
} from 'react-router-dom';
import TitleBar from '../TitleBar/TitleBar.jsx';
import Categories from '../Categories/Categories.jsx';
import Category from '../Category/Category.jsx';
import Footer from '../Footer/Footer.jsx';
import './PhotoPortfolio.css';

const PhotoPortfolio = observer(({ stateStore, api }) => {
  let { path } = useRouteMatch();

  const setScreenSize = () => {
    runInAction(() => {
      stateStore.screenInfo.width = stateStore.applicationRoot.clientWidth;
      stateStore.screenInfo.height = stateStore.applicationRoot.clientHeight;
    });
  };

  const setColumns = (width, height) => {
    if((width < height)) {
      document.body.style.setProperty('--number-of-columns', 2);
    } else {
      document.body.style.setProperty('--number-of-columns', 5);
    }
  }

  window.removeEventListener('resize', setScreenSize);
  window.addEventListener('resize', setScreenSize.bind(this));

  useEffect(() => {
    api.getCategories();
    stateStore.setModalDiv(document.querySelector('.app'));

    setScreenSize();
    setColumns(stateStore.screenInfo.width, stateStore.screenInfo.height);
    const disposer = reaction(
      () => [stateStore.applicationRoot.clientWidth, stateStore.applicationRoot.clientHeight],
      () => setScreenSize(stateStore.applicationRoot.clientWidth, stateStore.applicationRoot.clientHeight)
    );
    const disposer2 = reaction(
      () => [stateStore.screenInfo.width, stateStore.screenInfo.height],
      () => setColumns(stateStore.screenInfo.width, stateStore.screenInfo.height)
    );
    return () => {
      disposer();
      disposer2();
    }
  })

  return (
    <div className="app">
      <TitleBar stateStore={stateStore} api={api}/>
      <div className="photo-portfolio">
        <Switch>
          <Route exact path={path}>
            <Categories stateStore={stateStore} api={api}/>
          </Route>
          <Route path="/category/:categoryId">
            <Category 
              key={stateStore.visibleCategory.categoryId.toString()} 
              stateStore={stateStore}
              categoryName={stateStore.visibleCategory.categoryName}
              api={api}
            />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
});

PhotoPortfolio.displayName = 'PhotoPortfolio';

export default PhotoPortfolio;