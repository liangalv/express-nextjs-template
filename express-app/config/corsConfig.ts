
//Cors whitelist
const whitelist = process.env.WHITELIST.split(',').map(str => str.trim());
console.log(whitelist);
var corsOptions = {
  origin: (origin, callback) =>{
    if(whitelist.indexOf(origin) !== -1){
      //null implies no error, true here sends it back to cors indicating it's the same origin
      callback(null,true)
    }else{
      callback(new Error("Not in CORS whitelist"))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}


export default corsOptions;
