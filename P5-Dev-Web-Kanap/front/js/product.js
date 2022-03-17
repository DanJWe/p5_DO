let str = location.href;
let url = new URL(str);
let id = url.searchParams.get("id");
console.log(id);

 


fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.imageUrl)
    
    
    document.querySelector("#title").innerHTML += `<h3 class="productName">${data.name}</h3>`
    document.querySelector(".item__img").innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}"></img>`
    document.querySelector("#price").innerHTML += `${data.price}`
    document.querySelector("#description").innerHTML += `${data.description}`
   
    let length = data.colors.length
    for (let i = 0; i < length; i++){
      document.querySelector("#colors").innerHTML +=`<option value="${data.colors[i]}">${data.colors[i]}</option>`
    }
    
  }

  
 
);



const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

function handleClick() {
  const color = document.querySelector("#colors").value
  const quantity = document.querySelector("#quantity").value

  if (isOrderInvalid(color, quantity)) return
  saveOrder(color, quantity)
  redirectToCart()
}


function saveOrder(color, quantity) {
  const key = `${id}-${color}`
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity)
    
  }
  localStorage.setItem(key, JSON.stringify(data))
}



function isOrderInvalid(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("Veuillez séléctionner une quantité et une couleur")
    return true
  }
}

function redirectToCart() {
  window.location.href = "cart.html"
}
