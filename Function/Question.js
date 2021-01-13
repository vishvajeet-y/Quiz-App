const request=require('request')
const url="https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
//const url="https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
const Question=(callback)=>
{

    request({url,json:true},(error,response)=>{
        if(error)
        {
            console.log("Error occured")
            callback('Unable to fetch question',undefined)
        }
        
        else{
           
            data=response.body
            callback(undefined,data)
        }
     
     
    })
    
}

module.exports=Question