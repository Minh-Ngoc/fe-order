import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';

const cx = classNames.bind(styles);

function OrderAdd() {
    const navigate = useNavigate();
    const params = useParams();
    const [productList, setProductList] = useState([]);

    const [sanphamId, setSanPhamId] = useState('');
    const [soluong, setSoLuong] = useState(new Number(1));

    const soban = params.slug;

    const number = soban.split("-");

    useEffect(() => {
        const API_PRODUCT_ADD = {
            method: 'GET',
            url: 'http://localhost:6969/sanpham/list',
        };

        axios(API_PRODUCT_ADD)
            .then(result => {
                setProductList(result.data.sanpham)
            })
            .catch(err => {
                if(err) {
                    return toast.error("Không có món ăn nào được tạo!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!sanphamId && !soluong) {
            return toast.error("Vui lòng nhập đầy đủ thông tin!", {
                position: toast.POSITION.TOP_RIGHT,
            })
        } else if(!sanphamId) {
            return toast.error("Vui lòng chọn món ăn!", {
                position: toast.POSITION.TOP_RIGHT,
            })
        } else if(!soluong) {
            return toast.error("Vui lòng nhập giá!", {
                position: toast.POSITION.TOP_RIGHT,
            })
        } 

        const API_PRODUCT_ADD = {
            method: 'POST',
            url: 'http://localhost:6969/order/create',
            data: {
                soban: number[number.length -1],
                sanphamId: sanphamId, 
                soluong: soluong,
            }
        };

        axios(API_PRODUCT_ADD)
            .then(result => {
                setSanPhamId('');
                setSoLuong('');
                return toast.success("Thêm order thành công!", {
                    position: toast.POSITION.TOP_RIGHT,
                })
            })
            .catch(err => {
                if(err) {
                    return toast.error("Thêm order thất bại!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
            })

    }
     
    return ( 
        <div className={cx('container-fluid')}>
            <div className='pt-5 pb-3 text-center'>
                <span className={cx('form__title')}>BÀN SỐ {number[number.length -1]} </span>
            </div>
        
            <Form onSubmit={(e) => handleSubmit(e)}>
                
                <Form.Group className={cx('form__control')} controlId="formBasicPassword">
                    <Form.Label>Món ăn: </Form.Label>
                    <Form.Select defaultValue="Chọn món ăn..." name='sanphamId' onChange={(e) => setSanPhamId(e.target.value)}>
                        <option disabled>Chọn món ăn...</option>
                        {productList.map(product => (
                            <option key={product._id} value={product._id}> {product.ten} </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className={cx('form__control')} controlId="formBasicPassword">
                    <Form.Label>Số lượng: </Form.Label>

                    <div className={cx('form__quantity')}>
                        <Form.Control 
                            className='text-center'
                            type="number" 
                            name='soluong' 
                            min='1'
                            value={ soluong }
                            placeholder="VD: 2..." 
                            onChange={e => setSoLuong(e.target.value)}
                            onMouseOut={e => setSoLuong(e.target.value === null || e.target.value === '' ? 1 : e.target.value)}
                        />
                        <Button 
                            onClick={ () => {
                                if(soluong > 1) {
                                    setSoLuong(new Number(soluong-1))
                                } else if (soluong === null) {
                                    setSoLuong(1)
                                }
                            } }
                            className={cx('form__button', 'btn__quantity', 'btn__quantity__down')} 
                            variant="success" 
                            type="button"
                        >
                            -
                        </Button>
                        <Button 
                            onClick={() => setSoLuong(new Number(soluong+1))} 
                            className={cx('form__button', 'btn__quantity', 'btn__quantity__up')} 
                            variant="primary" 
                            type="button"
                        >
                            +
                        </Button>
                    </div>
                </Form.Group>
                
                <div className='d-flex pt-2 pb-2'>
                    <Button className={cx('form__button')} variant="primary" type="submit">
                        Thêm vào order
                    </Button>
                    <Button className={cx('form__button')} variant="danger" type="button" onClick={() => navigate(-1)}>
                        Trở về
                    </Button>
                </div>
            </Form>    

            <ToastContainer style={{width: '250px'}}/>
        </div>
    );
}

export default OrderAdd;