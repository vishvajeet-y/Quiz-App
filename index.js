const express=require('express')
const app=express()
const hbs=require('hbs')
const path=require('path')
const public_directoy=path.join(__dirname,'./public')
const views_dir=path.join(__dirname,'./template/views')
const partial_dir=path.join(__dirname,'./template/partial')
const port=process.env.PORT ||3000
app.set('view engine','hbs')
app.set('views',views_dir)
app.use(express.static(public_directoy))
hbs.registerPartials(partial_dir)
///////////////////////////////////////////
/*Using Helper function to check for if arg1  is correct answer or not */
  hbs.registerHelper('check_Val',function(arg1,arg2,options){
   return  arg1==arg2?options.fn(this) : options.inverse(this);
  })
  /*Using Helper function to check for if any error occured or not */
  hbs.registerHelper('check_Que',function(arg1,arg2,options){
    return  arg1==arg2?options.fn(this) : options.inverse(this);
  })
  /*Using Helper function to check for if arg1 is equal to  arg2 */
  hbs.registerHelper('check_result',function(arg1,arg2,options){
     if(arg1==arg2)
    return options.fn(this)
   })
/*Using Helper function to check for if arg1 is less than or equal arg2 */
   hbs.registerHelper('check_result2',function(arg1,arg2,options){
    if(arg1<=arg2)
    return options.fn(this)
   })
///////////////////////////////////////////
/* Fetching question from API */
const question=require('./Function/Question')
var question1

////////////////////////////////////////////////
app.get('',(req,res)=>{
  
    res.render('index')
})
app.get('/quiz',(req,res)=>{

  question((error,response)=>{
    if(error)
    {
      question1=undefined
      console.log(error)
    }
  else{
    question1=response.results
    question1.filter((x)=>{
        x.incorrect_answers= x.incorrect_answers.concat(x.correct_answer)
     shuffle(x.incorrect_answers)
    })
  }
  console.log(question1)
  res.render('quiz',{question1:question1})
  }) 
   
})

app.get('/result',(req,res)=>{
  var result=0
  for (const key in req.query) {
    //console.log(key, req.query[key])
      if(req.query[key]=='correct')
          result=result+1
  }
  result=result*10;
  solution={
    question1:question1,
    result:result
 }
  res.render('result',{solution:solution})
})

app.get('*',(req,res)=>{
  res.render('error')
})
app.listen(port,()=>{
    console.log('Server is on Port '+port)
})  
/*****This is used to suffle data present in incorrect array */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

