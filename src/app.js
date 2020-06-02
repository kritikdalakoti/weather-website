const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast =require('./utils/forecast.js')

const port=process.env.PORT || 3000 //if running locally 3000 port will work as heroku would not provide port value  else other value would work


//define paths for express config
const publicpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../template/views')
const partialspath=path.join(__dirname,'../template/partials')


//set up handle bars engine and location
app.set('views',viewpath)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)

//set up static directory
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req, res)=>{
    res.render('index',{
        title:'weather',
        name:'kritik dalakoti'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }


    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/about',(req,res)=> {
    res.render('about',{
        title:'about me',
        name:'kritik'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'i am awesome',
        title:'here for help',
        name:'kritik dalakoti'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send({
            error:'provide an address to find the weather'
        })

        geocode(req.query.address,(error,{latitude,longtitude,place}={})=>{
                if(error){
                    return res.send({
                        error:error    //if works can use short syntax
                    })
                }

                forecast(latitude,longtitude,(error,{temperature,name})=>{
                        if(error){
                        return res.send({
                            error:error  //if works use short form
                        })
                    }
                    res.send({
                        forecast:temperature,
                        location:place,
                        address:req.query.address
                    })

                    })
                })
        })   

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'kritik dalakoti',
        errormsg:'help page not found'
    })
})

app.get('*',(req,res)=>{
res.render('error',{
        title:'404',
        name:'kritik dalakoti',
        errormsg:'page not found'
})
})



app.listen(port,()=>{
    console.log('server is up at port '+ port)
})
