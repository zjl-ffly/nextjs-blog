import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { navs } from './config';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Button } from 'antd';
import Login from '@/components/login';

const NavBar: NextPage = () => {
    const { pathname, push } = useRouter();
    const [isShow, setIsShow] = useState(false);

    const handleGoEditPage = () => {
        push('/edit');
    };

    const handleLogin = () => {
        setIsShow(true);
    };

    return (
        <div className={styles.nav}>
            <section className={styles.logo}>logo</section>
            <section className={styles.link}>
                {navs?.map((item) => {
                    return (
                        <Link
                            key={item?.label}
                            href={item.path}
                            className={classNames(
                                styles.sinlink,
                                pathname === item?.path ? styles.active : ''
                            )}
                        >
                            {item?.label}
                        </Link>
                    );
                })}
            </section>
            <section className={styles.options}>
                <Button onClick={handleGoEditPage}>写文章</Button>
                <Button type="primary" onClick={handleLogin}>
                    登录
                </Button>
            </section>
            <Login
                isShow={isShow}
                onClose={() => {
                    setIsShow(false);
                }}
            />
        </div>
    );
};

// 1e80ff
export default NavBar;
