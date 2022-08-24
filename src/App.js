import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://62fcbac16e617f88de9cdd45.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      });
    axios.get('https://62fcbac16e617f88de9cdd45.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      });
    axios.get('https://62fcbac16e617f88de9cdd45.mockapi.io/favorites')
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://62fcbac16e617f88de9cdd45.mockapi.io/cart', obj)
      .then((res) => setCartItems((prev) => [...prev, res.data]));
  };

  const onAddToFavorite = async (obj) => {
    try {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`https://62fcbac16e617f88de9cdd45.mockapi.io/favorites/${obj.id}`);
    } else {
      const { data } = await axios.post('https://62fcbac16e617f88de9cdd45.mockapi.io/favorites', obj);
      setFavorites((prev) => [...prev, data]);
    }
      } catch (error) {
        alert('Не удалось добавить в фавориты');
      } 
  };
  const onRemoveItem = (id) => {
    axios.delete(`https://62fcbac16e617f88de9cdd45.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (<Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} Item />)}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          exact
          element={(
            <Home
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              items={items}
            />
          )}
        />

        <Route
          path="favorites"
          exact
          element={(
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          )}
        />
      </Routes>

    </div>
  );
}
export default App;
