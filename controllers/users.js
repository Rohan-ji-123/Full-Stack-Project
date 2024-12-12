module.exports.renderSingupForm = (req,res) =>{
    res.render("users/signup.ejs");
};

module.exports.singup = async(req,res) =>{
    try{
        let {username , email, password} = req.body;
        const newUser = new User ({email,username});
        const registedUser = await User.register(newUser ,password);
        // console.log(registedUser);
        req.login(registedUser,(err)=>{
            if(err){
                return next(err);
            };
            req.flash("success","Welcome to WanderLust !");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/singup");
    }
};

module.exports.rendetLoginForm = (req,res) =>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res) =>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = async(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("seccess","you are logged out!");
        res.redirect("/listings");
    });
}