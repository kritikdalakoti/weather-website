const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    msg1.textContent='loading.'
    msg2.textContent=''
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{ //by this it would be flexible and we can use it in local host or heroku
        response.json().then((data)=>{
            if(data.error)
            msg1.textContent=data.error
            else{
                msg1.textContent=data.forecast
                msg2.textContent=data.location
            }
             
        })    
    
    })

    
})