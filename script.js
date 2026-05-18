let nombreProducto = "";
let cantidadProducto = 0;
let totalProducto = 0;

function comprar(nombre, precio, inputId){

  let cantidad = document.getElementById(inputId).value;

  let total = precio * cantidad;

  nombreProducto = nombre;
  cantidadProducto = cantidad;
  totalProducto = total;

  document.getElementById("producto").innerHTML =
  "<strong>Perfume:</strong> " + nombre;

  document.getElementById("cantidad").innerHTML =
  "<strong>Cantidad:</strong> " + cantidad;

  document.getElementById("total").innerHTML =
  "<strong>Total:</strong> $" + total.toLocaleString();

  document.getElementById("modal").style.display = "flex";
}

document.getElementById("metodoPago").addEventListener("change", function(){

  let metodo = this.value;

  let info = document.getElementById("infoTransferencia");

  if(metodo === "Transferencia"){

    info.style.display = "block";

  }else{

    info.style.display = "none";
  }

});

document.getElementById("whatsappBtn").addEventListener("click", function(){

  let metodo = document.getElementById("metodoPago").value;

  let mensajeWhatsapp =
  `Hola! Quiero realizar un pedido:%0A%0A` +
  `Perfume: ${nombreProducto}%0A` +
  `Cantidad: ${cantidadProducto}%0A` +
  `Total: $${totalProducto}%0A` +
  `Método de pago: ${metodo}`;

  if(metodo === "Transferencia"){

    mensajeWhatsapp += `%0A%0AYa realicé la transferencia.`;
  }

  let numero = "5491168220298";

  let url = `https://wa.me/${numero}?text=${mensajeWhatsapp}`;

  window.open(url, "_blank");
});

function cerrarModal(){

  document.getElementById("modal").style.display = "none";
}