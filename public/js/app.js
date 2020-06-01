const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    msg1.textContent='loading.'
    msg2.textContent=''
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
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