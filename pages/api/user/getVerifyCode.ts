import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from 'iron-session/next';

const ironOptions = {
    cookieName: 'myapp_cookiename',
    password: 'complex_password_at_least_32_characters_long',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production', // 在生产环境中启用安全的 cookie
    },
};
export default withIronSessionApiRoute(getVerifyCode, ironOptions);
async function getVerifyCode(req: NextApiRequest, res: NextApiResponse) {
    setTimeout(async () => {
        req.session.user = {
            id: 1,
            username: '123',
        };
        await req.session.save();
        res.status(200).json({
            code: 0,
            data: 123,
        })
    }, 1000)
}