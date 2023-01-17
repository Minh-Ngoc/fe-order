import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styles from './DefaultLayout.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DefaultLayout({children}) {
  return (
    <div className={cx('wrapper') + ' d-flex flex-column justify-content-between'}>
        <div className={cx('children')}>
            {children}
        </div>
        <div className={cx('navbar')}>
            <nav className='col-12 flex-row'>
              <Link to="/" eventKey='home'>HOME</Link>
              <Link to="/order/list" eventKey="order">ORDER</Link>
              <Link to="/product" eventKey="product">PRODUCT</Link>
              <Link eventKey="link-2">HISTORY</Link>
              <Link eventKey="link-2">MANAGE</Link>
            </nav>
        </div>
    </div>
  );
}

export default DefaultLayout;