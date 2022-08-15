import React from 'react';
import styles from './Card.module.scss';

function Card(props) {
  const [isAdded, setIsAdded] = React.useState(false);

  const onClickPlus = () => {
    setIsAdded(!isAdded);
  };


    return (
        <div className={styles.card}> 
        <div className={styles.favorite} onClick={props.onClickFavorite}>
        <img src="/img/unlike.svg" alt="Unlike"/> 
        </div>
          <img width={133} height={112} src={props.imageUrl} alt="Sneakers"/>
          <h5>{props.title}</h5>
          <div className='d-flex justify-between align-center'>
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{props.price} rub</b>
            </div>
              <img className={styles.plus} onClick={onClickPlus} src={isAdded ? '/img/done.svg' : '/img/undone.svg'} alt="Plus"></img>
          </div>
        </div>
    );
}

export default Card; 