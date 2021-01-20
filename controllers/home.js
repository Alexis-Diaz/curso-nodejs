export const renderHome = (req, res)=>{
    console.log(req.session)
    res.render("index.ejs", {path: "home"});
}                          //el path envia el titulo de la pestaña
export default {renderHome}