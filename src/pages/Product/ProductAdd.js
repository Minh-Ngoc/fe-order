import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';

const cx = classNames.bind(styles);

function ProductAdd() {
    const navigate = useNavigate();
    const [ten, setTen] = useState('');
    const [gia, setGia] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!ten && !gia) {
            return toast.error("Vui lòng nhập đầy đủ thông tin!", {
                position: toast.POSITION.TOP_RIGHT,
            })
        } else if(!ten) {
            return toast.error("Vui lòng nhập tên!", {
                position: toast.POSITION.TOP_RIGHT,
            })
        } else if(!gia) {
            return toast.error("Vui lòng nhập giá!", {
                position: toast.POSITION.TOP_RIGHT,
            })
        } 

        const API_PRODUCT_ADD = {
            method: 'POST',
            url: 'http://localhost:6969/sanpham/create',
            data: {
                ten, 
                gia,
            }
        };

        axios(API_PRODUCT_ADD)
            .then(result => {
                setTen('');
                setGia('');
                return toast.success("Thêm món ăn thành công!", {
                    position: toast.POSITION.TOP_RIGHT,
                })
            })
            .catch(err => {
                if(err) {
                    return toast.error("Thêm món ăn thất bại!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                }
            })

    }
     
    return ( 
        <div className={cx('container-fluid')}>
            <div className='pt-5 pb-3 text-center'>
                <span className={cx('form__title')}>MÓN ĂN</span>
            </div>
        
            <Form onSubmit={(e) => handleSubmit(e)}>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tên món ăn:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name='ten' 
                        value={ten}
                        placeholder="VD: Chả..." 
                        onChange={(e) => setTen(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Giá: </Form.Label>
                    <Form.Control 
                        type="text" 
                        name='gia' 
                        value={gia}
                        placeholder="VD: 10.000" 
                        onChange={e => setGia(e.target.value)}
                    />
                </Form.Group>
                
                <div className='d-flex pt-2 pb-2'>
                    <Button className={cx('form__button')} variant="primary" type="submit">
                        Thêm món ăn mới
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

export default ProductAdd;