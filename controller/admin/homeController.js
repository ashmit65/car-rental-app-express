const User = require("../../models/User")
const fs =  require("fs") 
const path = require("path")


async function homePage(req,res){
    try {
        let data = await User.findOne({_id:req.session.userid})
        if(data){
            // Fix path if it contains 'public' prefix
            if(data.pic && data.pic.includes('public/')) {
                data.pic = data.pic.replace('public', '')
            }
            // If pic is not an image file (e.g., PDF), set it to null so default image shows
            if(data.pic && !data.pic.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
                data.pic = null
            }
            res.render("admin/home/index",{session: req.session, title:"Admin Home", data: data})
        }else{
            res.redirect("/admin/login")
        }
    } catch (error) {
        console.log(error)
    }

}
function login(req,res){
    res.render("admin/home/login",{session: req.session, title:"Admin Login"})
}
async function loginStore(req,res){
    try{
        let data = await User.findOne({$and:[
            {$or:[
                {username:req.body.username},
                {email:req.body.username}
            ]},
            {password:req.body.password}
        ]})
        if(data){
            req.session.login = true
            req.session.name= data.name
            req.session.userid = data.id
            req.session.role = data.role           
            return res.redirect("/admin")
        }
        else{
            return res.render("admin/home/login", {
                session: req.session, title:"Admin Login"
            })
        }
    }catch(error){
        console.log(error);
    }
}



function logout(req,res){
    req.session.destroy((error)=>{
        if(error) {
            console.log(error)
        }else{
            res.redirect("/admin/login")
        }
    })
}


async function profileUpdate(req,res){
    let data = await User.findOne({_id:req.session.userid})
        if(data){
            // res.render("admin/home/profile-update",{session: req.session, title:"Admin Profile Update", data:data})
            const errorMessage = req.query.error ? { file: req.query.error } : {}
            res.render("admin/home/profile-update",{session: req.session, title:"Admin Profile Update", data:data, errorMessage: errorMessage})
        }else{
            res.redirect("/admin/login")
        }

}

async function profileUpdateStore(req,res){
    try {
        let data = await User.findOne({_id:req.session.userid})
        if(data){
            data.name = req.body.name
            data.usersname = req.body.usersname
            data.email = req.body.email
            data.phone = req.body.phone
            // if(req.file){
                 // data.pic = req.file.path
                 // Remove 'public' from path since static files are served from public folder
                 // Convert: public/uploads/users/filename.jpg -> /uploads/users/filename.jpg
            //     data.pic = req.file.path.replace('public', '')
            // }
            // if(req.file) {
            //     try{
            //         const fs = require("fs")
            //         fs.unlinkSync(data.pic)
            //     }catch(error) { }
            //     data.pic = req.file[0].path
            // }
    //      Delete and Add new
            if(req.file) {
                if(data.pic) {
                    try{
                        fs.unlinkSync(path.join("public" + data.pic));
                    }catch (err){
                        console.log("Old profile image not found or already deleted")
                    }
                }
                data.pic = req.file.path.replace("public","")
            }
            await data.save()
            res.redirect("/admin")
        }else{
            res.redirect("/admin/login")
        }
    } catch (error) {
        console.log(error)
        res.redirect("/admin/update-profile")
    }
}


module.exports = {homePage, login, loginStore, logout, profileUpdate, profileUpdateStore}