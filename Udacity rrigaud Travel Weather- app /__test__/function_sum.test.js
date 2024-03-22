import {sum}  from '../src/server/sum';


describe ("Unit Testing functionality from server", () => {
//     //The test function takes two arguments  1 + 2 to equal 3 
     test ('adds 1 + 2 to equal 3', ()=> {
      expect(sum(1,2)).toEqual(3)


})})