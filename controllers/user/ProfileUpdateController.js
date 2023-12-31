const User = require('../../models/User')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './img/profile/user',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });



module.exports = (req, res) => {

    const middleware = upload.single('image');
    middleware(req, res, async (err) => {
        const image = req.file;
        const data = req.body;
        const { id_user, name, email, img} = data;
        
        if (!image) {
            await User.profiletext(data);
            await User.relogin(id_user).then(async (result) => {
                req.session.userId = await result[0]
            })
            res.redirect('/setting')
        } else {
            const image = req.file.filename;
            const imageUrl = `/img/profile/user/${image}`;
            await User.profile(data, imageUrl);
            await User.relogin(id_user).then(async (result) => {
                req.session.userId = await result[0]
            })
            res.redirect('/setting')
        }

    });

};