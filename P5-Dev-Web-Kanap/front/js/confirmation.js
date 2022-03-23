// Récuperer l'id de la commande
let orderId = localStorage.getItem("orderId");

//la structure HTML de la page 
let confirmation = ` <div class="confirmation">
<p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId"><!-- -->${orderId}</span></p>
</div>
</div> `
document.querySelector(".confirmation").innerHTML = confirmation;

// effacer le localStorage

function deleteLocalSTorage(key) {
    localStorage.removeItem(key);
};

deleteLocalSTorage("orderId")
deleteLocalSTorage("fileElement")
