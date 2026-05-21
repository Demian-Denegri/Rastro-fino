const API_URL = "https://localhost:7099";

// Cargar categorías en el select
async function cargarCategorias() {
  const response = await fetch(`${API_URL}/api/categorias`);
  const categorias = await response.json();

  const select = document.getElementById("prodCategoria");
  categorias.forEach(cat => {
    select.innerHTML += `<option value="${cat.idCategoria}">${cat.nombre}</option>`;
  });
}

// Cargar géneros en el select
async function cargarGeneros() {
  const response = await fetch(`${API_URL}/api/generos`);
  const generos = await response.json();

  const select = document.getElementById("prodGenero");
  generos.forEach(gen => {
    select.innerHTML += `<option value="${gen.idGenero}">${gen.nombre}</option>`;
  });
}

// Cargar productos en la tabla admin
async function cargarProductosAdmin() {
  const response = await fetch(`${API_URL}/api/productos/todos`);
  const productos = await response.json();

  const grid = document.getElementById("gridAdmin");
  grid.innerHTML = "";

  productos.forEach(producto => {
    grid.innerHTML += `
      <div class="card">
        <img src="${producto.imagen || 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop'}">
        <div class="contenido">
          <h2>${producto.nombre}</h2>
          <p class="precio">$${producto.precio.toLocaleString()}</p>
          <p>Stock: ${producto.stock}</p>
          <p>Estado: ${producto.activo ? '✅ Activo' : '❌ Inactivo'}</p>
          <input type="number" id="precio_${producto.idProducto}" value="${producto.precio}" placeholder="Nuevo precio">
          <input type="number" id="stock_${producto.idProducto}" value="${producto.stock}" placeholder="Nuevo stock">
          <button onclick="editarProducto(${producto.idProducto})">Guardar cambios</button>
          <button class="cerrar" onclick="${producto.activo ? `desactivarProducto(${producto.idProducto})` : `activarProducto(${producto.idProducto})`}">
            ${producto.activo ? 'Desactivar' : 'Reactivar'}
          </button>
        </div>
      </div>
    `;
  });
}

// Crear producto nuevo
async function crearProducto() {
  let producto = {
    nombre: document.getElementById("prodNombre").value,
    descripcion: document.getElementById("prodDescripcion").value,
    precio: parseFloat(document.getElementById("prodPrecio").value),
    stock: parseInt(document.getElementById("prodStock").value),
    imagen: document.getElementById("prodImagen").value,
    idCategoria: parseInt(document.getElementById("prodCategoria").value),
    idGenero: document.getElementById("prodGenero").value ? parseInt(document.getElementById("prodGenero").value) : null,
    ml: document.getElementById("prodMl").value ? parseInt(document.getElementById("prodMl").value) : null,
    activo: true
  };

  if(!producto.nombre || !producto.precio || !producto.stock || !producto.idCategoria){
    alert("Completá los campos obligatorios: nombre, precio, stock y categoría.");
    return;
  }

  await fetch(`${API_URL}/api/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });

  alert("Producto guardado!");
  cargarProductosAdmin();
}

// Desactivar producto
async function desactivarProducto(id) {
  await fetch(`${API_URL}/api/productos/${id}`, {
    method: "DELETE"
  });

  alert("Producto desactivado!");
  cargarProductosAdmin();
}

//cargar pedidos
async function cargarPedidos() {
  const response = await fetch(`${API_URL}/api/pedidos`);
  const pedidos = await response.json();

  const lista = document.getElementById("listaPedidos");
  lista.innerHTML = "";

  pedidos.forEach(pedido => {
    lista.innerHTML += `
      <div class="card">
        <div class="contenido">
          <h2>Pedido #${pedido.idPedido}</h2>
          <p>Cliente ID: ${pedido.idCliente}</p>
          <p>Fecha: ${new Date(pedido.fecha).toLocaleDateString()}</p>
          <p>Estado: ${pedido.estado}</p>
          <p class="precio">Total: $${pedido.total.toLocaleString()}</p>
        </div>
      </div>
    `;
  });
}

// Editar precio y stock
async function editarProducto(id) {
  let precio = parseFloat(document.getElementById(`precio_${id}`).value);
  let stock = parseInt(document.getElementById(`stock_${id}`).value);

  // Traer el producto completo primero
  const responseGet = await fetch(`${API_URL}/api/productos/${id}`);
  let producto = await responseGet.json();

  // Modificar solo precio y stock
  producto.precio = precio;
  producto.stock = stock;

  const response = await fetch(`${API_URL}/api/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });

  if(response.ok){
    alert("Producto actualizado!");
    cargarProductosAdmin();
  } else {
    alert("Hubo un error al actualizar.");
  }
}

// Reactivar producto
async function activarProducto(id) {
  await fetch(`${API_URL}/api/productos/activar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }
  });

  alert("Producto reactivado!");
  cargarProductosAdmin();
}

// Iniciar
cargarCategorias();
cargarGeneros();
cargarProductosAdmin();
cargarPedidos();