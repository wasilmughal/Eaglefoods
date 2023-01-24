var div = document.getElementById("div")
var key =localStorage.getItem("key")
console.log(key)

firebase.database().ref(`Dishes/`).once("value",(snap)=>{
var convert =snap.toJSON()

console.log(convert)

if(convert!=null){
    var value =Object.values(convert)

value.map((v,i)=>{
  console.log(  v.imgUrl)
div.innerHTML+=`

    <div class="col col-lg-3 ,col-md-4 ,col-sm-6 ,col-12" style="width: 18rem;">
      <div class="card" style="width: 200px;heigth:200px;">
        <div class="card-image" >
          <img src="${v.imgUrl }" style="width: 200px;heigth:200px;">
          <span class="card-title">${v.qty}</span>
        </div>
        <div class="card-content">
          <p> ${v.Price}
          <br> ${v.Dish_Name} </p>
        </div>
        <div class="card-action">
          <a href="#"  >Order</a>
        </div>
      </div>
    </div>


    
            

`



})



}

})