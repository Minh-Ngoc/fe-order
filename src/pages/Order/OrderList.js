import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';

import { toast } from 'react-toastify';
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

    // const numberTable = !orderList ? 0 : orderList.map(orderList => orderList.isPay === null).length;

    const tableList = () => {
        const arr = [];
        orderList.map(order => order.isPay === null ? arr.push(order) : '')
        
        return arr.map((arr, index) => (
            <div key={index} className={cx('container__table')}>
                <Link to={`/order/detail/ban-so-${arr.soban}`} key={index} state={{id: arr._id}}>
                    <img src='https://cdn-icons-png.flaticon.com/512/5696/5696492.png'/>
                    <span>Bàn số {arr.soban}</span>
                </Link>
            </div>  
        ))
    }

    

    return ( 
        <div className={cx('wrapper') + " container-fluid"}>
            <div className='pt-5 pb-3 text-center'>
                <span className={cx('form__title')}>SƠ ĐỒ BÀN ĂN</span>
            </div>
            <div className={cx('order__list')}>
                {!orderList ? '' : tableList()}
            </div>
            <div className={cx('new__order')}>
                <Link className={cx('btn__new__order')}>
                    <img src='https://cdn3.iconfinder.com/data/icons/rest/30/add_order-512.png'></img>
                </Link>
            </div>
        </div>
     );
}

export default OrderList;