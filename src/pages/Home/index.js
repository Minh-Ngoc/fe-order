import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {

    const numberTable = 12;

    const tableList = () => {
        const arr = [];
        for(let i = 1; i <= numberTable; i++) {
            arr.push(i < 10 ? '0' + i : i);
        }
        return arr.map((arr, index) => (
            <div key={index} className={cx('container__table')}>
                <Link to={`/order/create/ban-so-${arr}`}>
                    <img src='https://cdn-icons-png.flaticon.com/512/5696/5696492.png'/>
                    <span>{arr}</span>
                </Link>
            </div>  
        ))
    }

    

    return ( 
        <div className="container-fluid">
            <div className='pt-3 pb-3 text-center'>
                <span className={cx('form__title')}>SƠ ĐỒ BÀN ĂN</span>
            </div>
            <div className={cx('order__list')}>
                {!tableList ? '' : tableList()}
            </div>
        </div>
     );
}

export default Home;
