import React from 'react';
import styles from './Card.module.scss';

function Card({
  id, onFavorite, onPlus, title, imageUrl, price, favorited = false,
}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({
      id, title, imageUrl, price,
    });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img onClick={onClickFavorite} src={isFavorite ? '/img/like.svg' : '/img/unlike.svg'} alt="Unlike" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>
            {price}
            {' '}
            rub
          </b>
        </div>
        <img className={styles.plus} onClick={onClickPlus} src={isAdded ? '/img/done.svg' : '/img/undone.svg'} alt="Plus" />
      </div>
    </div>
  );
}

export default Card;
