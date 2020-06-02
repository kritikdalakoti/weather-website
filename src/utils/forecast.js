const request =require('request')

const forecast=(x,y,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=b09ad3110a218f204fd18af624fce92e&query=' + y+','+ x
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('cant connect to network!',undefined)
        }else if(body.error){
            callback('name didnt work .Try another name',undefined)
        }else{
            callback(undefined,{
                temperature:body.current.temperature,
                name:body.location.name,
                desc:body.current.weather_descriptions[0],
                humidity:body.current.humidity
            })
        }
    })
}

module.exports=forecast