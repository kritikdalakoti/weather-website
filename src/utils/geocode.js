const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia3JpdGlrZGFsYWtvdGkxIiwiYSI6ImNrYWk0ZWs1eTBtaXYycXQ5YnBzbWNjaDMifQ.9QHnu9XbtovGFNLPgEaXIA&limit=1'
    request({url,json:true},(error,{body}={})=>{
       // const {features,center,place_name}=Response
        if(error){
            callback('cant connect due to network failure',undefined)
        }else if(!body.features[0]){
            callback('Cant get the word . Try searching other name',undefined)
        }else{
            const latitude=body.features[0].center[0]
            const longtitude=body.features[0].center[1]
            const place=body.features[0].place_name
            //console.log(latitude,longtitude,place)
            const data={
                latitude,
                longtitude,
                place
            }
            callback(undefined,{latitude,longtitude,place})
        }        
    })    
}
module.exports=geocode
