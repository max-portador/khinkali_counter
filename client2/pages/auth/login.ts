import cookie from 'cookie'

export default (req, res) => {
    console.table(req)
    // res.setHeader(
    //     'Set-Cookie',
    //     cookie.serialize('token', req.body.token, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV !== 'development',
    //         maxAge: 60 * 60 * 24 * 7, // 7 days
    //         sameSite: "strict",
    //         path: '/',
    //     })
    // )

    // res.statusCode = 200;
    // res.json({ success: true});
}
