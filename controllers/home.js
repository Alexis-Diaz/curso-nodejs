export const renderHome = (req, res)=>{
    res.render("index.ejs", {path: "home"});
}                          //el path envia el titulo de la pestaña
export default {renderHome}