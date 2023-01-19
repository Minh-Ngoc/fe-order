import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const cx = classNames.bind(styles);

function OrderAdd(props) {
    const params = useParams();
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);

    const [sanphamId, setSanPhamId] = useState('');
    const [soluong, setSoLuong] = useState(new Number(1));

    const soban = params.slug;

    const number = soban.split("-");

    useEffect(() => {
        const API_PRODUCT_ADD = {
            method: 'GET',
            url: 'https://server-order.netlify.app/sanpham/list',
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
            url: `http://localhost:6969/order/add/${props.showModal.orderId}`,
            data: {
                sanphamId: sanphamId, 
                soluong: soluong,
            }
        };

        axios(API_PRODUCT_ADD)
            .then(result => {
                setSoLuong('');
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

    const handleShowModal = () => {
        props.showModal.showModal(false);
        props.showModal.setStyleModal(1);
        props.showModal.HandleBgcolor('#fff');
    }
     
    return ( 
        <div className={cx('modal__order__add')}>
    
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
                            variant="primary" 
                            type="button"
                        >
                            <FontAwesomeIcon icon={faMinus}/>
                        </Button>
                        <Button 
                            onClick={() => setSoLuong(new Number(soluong+1))} 
                            className={cx('form__button', 'btn__quantity', 'btn__quantity__up')} 
                            variant="success" 
                            type="button"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                </Form.Group>
                
                <div className='d-flex pt-2 pb-2'>
                    <Button className={cx('form__button')} variant="danger" type="button" onClick={() => handleShowModal()}>
                        Trở về
                    </Button>
                    <Button className={cx('form__button')} variant="primary" type="submit">
                        Thêm vào order
                    </Button>
                </div>
            </Form>    
        </div>
    );
}

export default OrderAdd;