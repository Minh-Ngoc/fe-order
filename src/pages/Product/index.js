import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import styles from './Product.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Product() {

    const [data, setData] = useState([]);

    useEffect(() => {
        function callAPI() {
            const API_PRODUCT_LIST = {
                method: 'GET',
                url: ' https://server-order.netlify.app/sanpham/list',
            };
            axios(API_PRODUCT_LIST)
                .then(result => {
                    setData(result.data.sanpham);
                })
                .catch(err => err)
        }
        callAPI();

    }, [])

    console.log(data)

    return ( 
        <div className={cx('wrapper')}>
            <div className='pt-5 pb-3 text-center'>
                <span className={cx('form__title')}>MENU</span>
            </div>
            <div className={cx('navbar__form')}>
                <FontAwesomeIcon icon={faPlus} />
                <Link to='/product/create' className={cx('form__button', 'form__button__add')}>
                    Thêm món ăn mới
                </Link>
            </div>
            <Table responsive className='text-center'>
                <thead>
                    <tr>
                        <th>Tên SP</th>
                        <th>Hình ảnh</th>
                        <th>Giá</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {!data ? '' : data.map((sanpham, index) => (
                        <tr className="align-middle" key={index}>
                            <td> {sanpham.ten} </td>
                            <td> {!sanpham.hinhanh ? 'Không có hình' : sanpham.hinhanh} </td>
                            <td> {sanpham.gia} </td>
                            <td> 
                                <Button
                                    className={cx('btn__edit') }
                                    variant="primary"
                                    type="submit"
                                    size='sm'
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                            </td>
                            <td className="text-center"> 
                                <Button
                                    className={cx('btn__delete') }
                                    variant="danger"
                                    type="submit"
                                    size='sm'
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
     );
}

export default Product;