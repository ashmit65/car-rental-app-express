const hbs = require("hbs")

hbs.registerHelper("isLogin",function (session) {
    return session && session.login? true:false
})

hbs.registerHelper("userName",function (session) {
    return session && session.login? session.name : ""
})

hbs.registerHelper("checkDropDown", function (selected, option) {
    return selected === option ? "selected" : "";
})

hbs.registerHelper("checkActive", function (currentStatus, status) {
    return currentStatus === status ? "selected" : "";
})

hbs.registerHelper("isSuperAdmin",function (session) {
    return session && session.role === "Super Admin" ? true : false
})

hbs.registerHelper("getDate",function (date) {
    return new Date(date).toLocaleDateString()
})