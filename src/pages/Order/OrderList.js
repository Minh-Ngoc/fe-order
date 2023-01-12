import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';

import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


const cx = classNames.bind(styles);

function OrderList() {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const API_PRODUCT_ADD = {
            method: 'GET',
            url: 'http://localhost:6969/order/list',
        };

        axios(API_PRODUCT_ADD)
            .then(result => {
                setOrderList(result.data.order)
            })
            .catch(err => {
                if(err) {
                    return toast.error("Không có món ăn nào được tạo!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
            })
    }, []);

    const numberTable = !orderList ? 0 : orderList.map(orderlist => orderList.isPay === null).length;

    const tableList = () => {
        const arr = [];
        for(let i = 1; i <= numberTable; i++) {
            arr.push(i);
        }
        return arr.map((arr, index) => (
            <div key={index} className={cx('container__table')}>
                <Link to={`/order/create/ban-so-${arr}`}>
                    <img src='https://cdn-icons-png.flaticon.com/512/5696/5696492.png'/>
                    <span>Bàn số {arr}</span>
                </Link>
            </div>  
        ))
    }

    

    return ( 
        <div className="container-fluid">
            <div className='pt-5 pb-3 text-center'>
                <span className={cx('form__title')}>SƠ ĐỒ BÀN ĂN</span>
            </div>
            <div className={cx('order__list')}>
                {!tableList ? '' : tableList()}
            </div>
            <ToastContainer style={{width: '250px'}}/>
        </div>
     );
}

export default OrderList;