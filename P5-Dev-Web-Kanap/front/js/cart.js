let prixTotal = 0
let quantiteTotal = 0


for (var i = 0; i < localStorage.length; i++) {
    let data = [];
    const key = localStorage.key(i);
    data = JSON.parse(localStorage.getItem(key)); 
    
    
    
    fetch(`http://localhost:3000/api/products/${data.id}`)
    .then((res) => res.json())
    .then((apidata) => {

        
        document.querySelector("#cart__items").innerHTML += 

            `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
            <div class="cart__item__img">
            <img src="${apidata.imageUrl}" alt="${apidata.altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${apidata.name}</h2>
            <p>${data.color}</p>
            <p>${apidata.price} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
            </div>
            </div>
            </article>`;
        

        //fonction supprimer un Article
        let getId = document.querySelectorAll(".deleteItem")

        getId.forEach(element => {
            element.addEventListener("click", () => {
                let articleDelete = element.closest(".cart__item")
                let dataID = articleDelete.getAttribute("data-id");
                let dataIdColor = articleDelete.getAttribute("data-color");
                articleDelete.remove()
                localStorage.removeItem(`${dataID}-${dataIdColor}`)
            })
        })

        //fonction ecouter le changement de quantités et modifier le local storage

        let quantites = document.querySelectorAll(".itemQuantity")

        quantites.forEach(quantity => {
            quantity.addEventListener("change", () => {
                let articleParent = quantity.closest(".cart__item");
                let dataID = articleParent.getAttribute("data-id");
                let dataIdColor = articleParent.getAttribute("data-color");
                let id = `${dataID}-${dataIdColor}`
                const newData =`{"id":"${dataID}","color":"${dataIdColor}","quantity":${quantity.value}}`
                localStorage.setItem(id, newData);
                totalPrix();
                totalQuantity();
                location.reload()
            })
            
        })

        //fonction calcul des quantités total et prix total

        function totalPrix(){
            prixTotal = prixTotal + apidata.price * data.quantity
            let totalPrice = document.querySelector('#totalPrice')
            totalPrice.innerHTML = prixTotal
        }
        totalPrix()

        function totalQuantity(){
            quantiteTotal = quantiteTotal + data.quantity
            let totalQuantity = document.querySelector('#totalQuantity')
            totalQuantity.innerHTML = quantiteTotal
        }
        totalQuantity()

    })  
    
}

