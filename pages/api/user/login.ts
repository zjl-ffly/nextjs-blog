import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from 'iron-session/next';

const ironOptions = {
    cookieName: 'myapp_cookiename',
    password: 'complex_password_at_least_32_characters_long',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production', // 在生产环境中启用安全的 cookie
    },
};
export default withIronSessionApiRoute(login, ironOptions);
async function login(req: NextApiRequest, res: NextApiResponse) {
    const { name, code } = req.body;
    console.log(name, code);

    setTimeout(() => {
        res.status(200).json({
            code: 0,
            data: {
                name: name,
                code: code,
            }
        })
    }, 1000)
}