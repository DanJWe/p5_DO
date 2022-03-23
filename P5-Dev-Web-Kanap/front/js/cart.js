//Variables pour stocker le prix total et les quantitée total

let prixTotal = 0;
let quantiteTotal = 0;

//Création d'un tableau contenant les id des produits
let products = [];

// Boucles sur la longeur du local storage afin d'aficher les produits sure la page panier

for (var i = 0; i < localStorage.length; i++) {
  let data = [];
  const key = localStorage.key(i);
  data = JSON.parse(localStorage.getItem(key));
  products.push(data.id);

  // on se connect à l'API afin de récuperer les information non stocké dans le local storage

  fetch(`http://localhost:3000/api/products/${data.id}`)
    .then((res) => res.json())
    .then((apidata) => {
      // Création d'un article dans le panier

      document.querySelector(
        "#cart__items"
      ).innerHTML += `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
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
      let getId = document.querySelectorAll(".deleteItem");

      getId.forEach((element) => {
        element.addEventListener("click", () => {
          let articleDelete = element.closest(".cart__item");
          let dataID = articleDelete.getAttribute("data-id");
          let dataIdColor = articleDelete.getAttribute("data-color");
          articleDelete.remove();
          localStorage.removeItem(`${dataID}-${dataIdColor}`);
        });
      });

      //fonction ecouter le changement de quantités et modifier le local storage

      let quantites = document.querySelectorAll(".itemQuantity");

      quantites.forEach((quantity) => {
        quantity.addEventListener("change", () => {
          let articleParent = quantity.closest(".cart__item");
          let dataID = articleParent.getAttribute("data-id");
          let dataIdColor = articleParent.getAttribute("data-color");
          let id = `${dataID}-${dataIdColor}`;
          const newData = `{"id":"${dataID}","color":"${dataIdColor}","quantity":${quantity.value}}`;
          localStorage.setItem(id, newData);
          totalPrix();
          totalQuantity();
          location.reload();
        });
      });

      //fonction calcul des quantités total et prix total

      function totalPrix() {
        prixTotal = prixTotal + apidata.price * data.quantity;
        let totalPrice = document.querySelector("#totalPrice");
        totalPrice.innerHTML = prixTotal;
      }
      totalPrix();

      function totalQuantity() {
        quantiteTotal = quantiteTotal + data.quantity;
        let totalQuantity = document.querySelector("#totalQuantity");
        totalQuantity.innerHTML = quantiteTotal;
      }
      totalQuantity();
    });
}

console.log(products);

// RegEx pour le formulaire

let cartForm = document.querySelector(".cart__order__form");
cartForm.firstName.addEventListener("change", function () {
  validFirstName(this);
});
const validFirstName = function (inputFirstName) {
  let firstNameRegExp = new RegExp(`^[a-zA-Z,-]+$`, "g");
  let testFirstName = firstNameRegExp.test(inputFirstName.value);
  let firstNameErrorMsg = inputFirstName.nextElementSibling;
  if (testFirstName) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.innerHTML = "Prénom non valide";
  }
};

cartForm.lastName.addEventListener("change", function () {
  validLasttName(this);
});
const validLasttName = function (inputLastName) {
  let lastNameRegExp = new RegExp(`^[a-zA-Z,-]+$`, "g");
  let testLastName = lastNameRegExp.test(inputLastName.value);
  let lastNameErrorMsg = inputLastName.nextElementSibling;
  if (testLastName) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.innerHTML = "Nom non valide";
  }
};

cartForm.address.addEventListener("change", function () {
  validAddress(this);
});
const validAddress = function (inputAddress) {
  let addressRegExp = new RegExp(`^[0-9]+[ |[a-zà-ú.,-]+$`, "g");
  let testAddress = addressRegExp.test(inputAddress.value);
  let addressErrorMsg = inputAddress.nextElementSibling;
  if (testAddress) {
    addressErrorMsg.innerHTML = "";
  } else {
    addressErrorMsg.innerHTML = "Adresse non valide";
  }
};

cartForm.city.addEventListener("change", function () {
  validCity(this);
});
const validCity = function (inputCity) {
  let cityRegExp = new RegExp(`^[a-zA-Z,-]{3,}$`, "g");
  let testCity = cityRegExp.test(inputCity.value);
  let cityErrorMsg = inputCity.nextElementSibling;
  if (testCity) {
    cityErrorMsg.innerHTML = "";
  } else {
    cityErrorMsg.innerHTML = "Nom de la ville non valide";
  }
};

cartForm.email.addEventListener("change", function () {
  validEmail(this);
});
const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp(
    `^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$`,
    "g"
  );
  let testEmail = emailRegExp.test(inputEmail.value);
  let emailErrorMsg = inputEmail.nextElementSibling;
  if (testEmail) {
    emailErrorMsg.innerHTML = "";
  } else {
    emailErrorMsg.innerHTML = "Email non valide";
  }
};

//Rentrer les donner du Formulaire dans le localstorage

let sentFileButton = document.querySelector("#order");
sentFileButton.addEventListener("click", (event) => {
  event.preventDefault();

  let a = document.querySelector("#firstName").value;
  let b = document.querySelector("#lastName").value;
  let c = document.querySelector("#address").value;
  let d = document.querySelector("#city").value;
  let e = document.querySelector("#email").value;

  if ((a, b, c, d, e == "")) {
    alert("Veuillez completer le formulaire");
  } else {
    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };
    console.log(contact);

    // Validation du formulaire pour le localstorage
    localStorage.setItem("fileElement", JSON.stringify(contact));

    // Objet rassemblant les produits sélectionnées et le formulaire validé
    const submitButton = {
      contact,
      products,
    };
    console.log("submitButton", JSON.stringify(submitButton));

    // Envoyer le localstorage avec fetch en méthode post
    let orderButton = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(submitButton),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((dataPost) => {
        console.log("Success", dataPost);
        localStorage.setItem("orderId", dataPost.orderId);
        window.location = "confirmation.html";
      })
      .catch((error) => {
        console.error("Error", error);
      });
    console.log(orderButton);
  }
});
