
// "use strict"
// const Users = [
//     {
//         name: 'hieu',
//         age: 1
//     },
//     {
//         name: 'minh',
//         age: 2
//     }
// ]
// const {name} = Users[0];
// class Animal {
//     constructor(name) {
//       this.name = name;
//     }
  
//     speak() {
//       console.log(this.name + ' makes a noise');
//     }
//   }
  
//   class Dog extends Animal {
//     constructor(name) {
//       super(name); // gọi constructor của class cha
//     }
    
//     speak() {
//         super.speak();
//         console.log(this.name + ' barks');
//     }
//   }
  
//   let dog = new Dog('Rex');
//   dog.speak(); // Output: Rex barks
  
// require('./src/models/user.model');
// import jwt from 'jsonwebtoken';
// let a;
// jwt.sign({a:1},'123',{
//   algorithm:'HS256',
//   expiresIn:'1h'
// },(err,token) =>{
//   Promise.resolve(token).then((data) => {console.log(data); a = token ; console.log(a)});
// }) 

// console.log(123);
// import youtubesearchapi from 'youtube-search-api';
// youtubesearchapi.GetListByKeyword("escapse",false,5,[{type:'video'}]).then((data) => console.log(data)
// )

// import { signToken, verifyToken } from "./src/helper/jwt_service.js";
// signToken({name:'hieu',age: '123'})
// .then((data) => {
//     console.log(data);
//     return verifyToken(data);
// })
// .then((data) => console.log(data))

// let {a} = require('./test1')
// console.log(a);

const a = function test(){
    return 123;
}
console.log(a());
const b = a();
console.log(b);