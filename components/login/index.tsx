import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { message } from 'antd';
import axios from 'axios';

interface LoginProps {
    isShow: boolean;
    onClose: () => void;
}

const Login = ({ isShow, onClose }: LoginProps) => {
    const [form, setForm] = useState({
        name: '',
        code: '',
    });
    const [count, setCount] = useState(0);
    const [isShowCount, setIsShowCount] = useState(false);
    const onLogin = () => {
        axios.post('/api/user/login', { ...form }).then((res) => {
            console.log(res);
            onClose();
        });
    };

    const getVerifyCode = () => {
        if (!form?.name) {
            message.error('请输入手机号');
            return;
        }
        axios.post('/api/user/getVerifyCode').then((res) => {
            setIsShowCount(true);
            setCount(3);
        });
    };

    const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    useEffect(() => {
        let time;
        if (count <= 0) {
            setIsShowCount(false);
            return;
        }
        time = setTimeout(() => {
            setCount((count) => count - 1);
        }, 1000);

        return () => clearTimeout(time);
    }, [count]);

    return (
        <div
            style={{
                display: isShow ? 'block' : 'none',
            }}
            className={styles.login}
        >
            <div className={styles.loginBox}>
                <div className={styles.loginTitle}>
                    <div>登录</div>
                    <button onClick={onClose}>x</button>
                </div>

                <div className={styles.loginContent}>
                    <input
                        name="name"
                        value={form.name}
                        type="text"
                        placeholder="请输入手机号"
                        onChange={onChangeForm}
                    />

                    <div className={styles.verify}>
                        <input
                            name="code"
                            value={form.code}
                            type="text"
                            placeholder="请输入验证码"
                            onChange={onChangeForm}
                        />
                        {!isShowCount ? (
                            <button
                                onClick={getVerifyCode}
                                className={styles.getCodeBtn}
                            >
                                获取验证码
                            </button>
                        ) : (
                            <span className={styles.count}>{count}</span>
                        )}
                    </div>
                    <button className={styles.loginBtn} onClick={onLogin}>
                        登录
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
