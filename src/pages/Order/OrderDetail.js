import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import OrderAdd from './OrderAdd';

import axios from 'axios';

const cx = classNames.bind(styles);

function OrderDetail() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [order, setOrder] = useState([]);
    const [orderAdd, setOrderAdd] = useState();

    const [style, setStyle] = useState(1);
    const [bgcolor, setBgcolor] = useState(false);

    const [sanphamList, setSanPhamList] = useState([]);
    const orderId = location.state.id;

    const soban = params.slug;

    const number = soban.split("-");

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        const API_ORDER_DETAIL = {
            method: 'GET',
            url: `http://localhost:6969/order/detail/${orderId}`,
        };

        axios(API_ORDER_DETAIL)
            .then(result => {
                setOrder(result.data.order);
                setSanPhamList(result.data.sanpham);
            })
            .catch(err => {
                if(err) {
                    return toast.error("Không có ORDER nào!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
            })
    }, []);

    let totalMoney;
    const getTotalMoney = (gia, soluong) => totalMoney = gia*soluong;

    const showModal = (e) => {
        setOrderAdd(e);
    };
    
    const setStyleModal = (e) => setStyle(e);

    const HandleBgcolor = (e) => setBgcolor(e);

     console.log(orderId);
    return ( 
        <>
            <div style={ {opacity: style, backgroundColor: bgcolor ? bgcolor : ''} } className={cx('wrapper') + ' d-flex flex-column justify-content-between' } >
                <div className='col-12'>
                    <div className='pt-4 pb-3 text-center'>
                        <span className={cx('form__title')}>BÀN SỐ {number[number.length -1]} </span>
                    </div>
                    <div className='row mt-2 mb-2'>
                        <Table responsive className={cx('table_order__detail') + ' text-center'}>
                            <thead>
                                <tr>
                                    <th>Tên SP</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order.sanpham ? order.sanpham.map((sanpham, index) => 
                                        sanphamList.map(sanphamDetail => {
                                            if(sanphamDetail._id === sanpham.sanphamId) { 
                                                getTotalMoney(sanphamDetail.gia, sanpham.soluong);
                                                return (
                                                    <tr key={index}>
                                                        <td> {sanphamDetail.ten} </td>
                                                        <td> {VND.format(sanphamDetail.gia) } </td>
                                                        <td> { sanpham.soluong } </td>
                                                        <td> { sanpham.soluong * sanphamDetail.gia } </td>
                                                    </tr>
                                                )
                                            }
                                        }) 
                                    ) : null
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div className='col-12 d-flex justify-content-around'>
                        <b>Tổng số tiền:</b>
                        <span> {VND.format(totalMoney)} </span>
                    </div>
                </div>

                <div className={cx('btn__order__detail')}>
                    <div className='d-flex pt-3 pb-3'>
                        <Button style={{opacity: style}} className={cx('form__button')} variant="danger" type="button" onClick={() => navigate(-1)}>
                            TRỞ VỀ
                        </Button>
                        <Button 
                             style={{opacity: style}}
                            className={cx('form__button')} 
                            variant="success" type="button" 
                            onClick={() => { 
                                setOrderAdd(true); 
                                setStyle(0.5);
                                setBgcolor('#b3b3b3')
                            }}
                        >
                            THÊM ORDER
                        </Button>
                    </div>
                        <Button style={{opacity: style}} className={cx('form__button')} variant="primary" type="button">
                            THANH TOÁN
                        </Button>
                </div>
                

            </div>
            {
                orderAdd ? (
                    <OrderAdd showModal={{showModal, setStyleModal, HandleBgcolor, orderId: orderId}} />
                ) : ''
            }
        </>
    );
}

export default OrderDetail;