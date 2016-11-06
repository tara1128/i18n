/*
  Script for cms page
  Deal with the business.
*/

console.log('The second js is executed!' );

var arr = [10,29,33,12,24,212,45];
arr.map(function(value, index){
  if(index % 3 == 0) {
    console.log( 'Test js', value, index );
  }
});


