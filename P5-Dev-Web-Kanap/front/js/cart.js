












for (var i = 0; i < localStorage.length; i++) {

    const key = localStorage.key(i);
    var data = JSON.parse(localStorage.getItem(key)); 
    console.log(data)
    
            
        
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
        // console.log(getId)

        getId.forEach(element => {
            element.addEventListener("click", () => {
                let articleDelete = element.closest(".cart__item")
                // console.log(articleDelete)
                let dataID = articleDelete.getAttribute("data-id");
                let dataIdColor = articleDelete.getAttribute("data-color");
                articleDelete.remove()
                localStorage.removeItem(`${dataID}-${dataIdColor}`)
            })
        })


        //fonction total quantité * prix
        
        
        
        
        

             function maFonctionTotal() {
                let resultat = data.quantity * apidata.price
               return resultat;
             }
            
              let resTampon = [];
              resTampon.push(maFonctionTotal());
              console.log(resTampon);
        

        // console.log(maFonctionTotal())

        // var tableauTotal = []
        // tableauTotal.push(maFonctionTotal ())
        // console.log(tableauTotal)


    

    })  
    
}

















    
 


