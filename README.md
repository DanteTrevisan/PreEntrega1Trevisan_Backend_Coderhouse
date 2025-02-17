# PREENTREGA 1 DANTE TREVISAN PROGRAMACION BACKEND CON TYPESCRIPT

Primera Preentrega del proyecto final del curso de Programacion Backend de CoderHouse

## Consigna

Desarrollar un servidor que contenga los **endpoints** y servicios necesarios para gestionar los productos y carritos de compra para tu API.

El servidor debe estar basado en Node.js y Express, y debe escuchar en el puerto 8080. Se deben disponer dos grupos de rutas: **/products** y **/carts**. Estos endpoints estarán implementados con el router de Express, con las siguientes especificaciones:

- Rutas para Manejo de **Productos** (/api/products/)
    **GET /:**
    - Debe listar todos los productos de la base de datos.

    **GET /:pid:**
    - Debe traer solo el producto con el id proporcionado.

    **POST /:**
    - Debe agregar un nuevo producto con los siguientes campos: id: Number/String (No se manda desde el body, se autogenera para asegurar que nunca se repitan los ids).

    - **title**: _String_.
    - **description**: _String_.
    - **code**: _String_.
    - **price**: _Number_.
    - **status**: _Boolean_.
    - **stock**: _Number_.
    - **category**: _String_.
    - **thumbnails**: **Array** de _Strings_. (rutas donde están almacenadas las imágenes del producto).

    - **Status** es **true** por defecto.
    - Todos los campos son obligatorios, a excepcion de **thumbnails**

    **PUT /:pid:**
    - Debe actualizar un producto por los campos enviados desde el body. No se debe actualizar ni eliminar el idal momento de hacer la actualización.

    **DELETE /:pid:**
    - Debe eliminar el producto con el pid indicado.

- Rutas para Manejo de **Carritos** (/api/carts/)
    **POST /**:
    - Debe crear un nuevo carrito con la siguiente estructura: **id**: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).

    - **products**: Array que contendrá objetos que representen cada producto.

    **GET /:cid**:
    - Debe listar los productos que pertenecen al carrito con el cid proporcionado.

   **POST /:cid/product/:pid**:
       - Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato:
           - product: Solo debe contener el ID del producto.
           - quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).
       Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.

## Entrega

Enlace al repositorio de **GitHub** con el proyecto completo, sin la carpeta de **node_modules**

## Dependencies

- `npm i express`

> **Express.js** es un framework **framework** minimalista y flexible para **Node.js** que simplifica el desarrollo de aplicaciones web y **APIs** al proporcionar características esenciales como enrutamiento, manejo de **middleware**, integración con motores de plantillas, gestión de errores, y más. Su enfoque modular y su extensibilidad permiten a los desarrolldores construir aplicaciones de manera rápida y eficiente, adaptándose a las necesidades específicas de sus proyectos. Express.js es ampliamente utilizado en la comunidad de **Node.js** debido a su facilidad de uso y su capacidad para construir aplicaciones web escalables y robustas.

- `npm i zod`

> **Zod** es una biblioteca de validación de datos para **Typescript** y **Javascript**. Proporciona una fomar simple y robusta de definir esquemas de datos y validarlos en tiempo de ejecución. Permite definir fáacilmente la estructura y restricciones de datos, y luego utilizar esos esquemas para validar entradas de usuario, datos de **API**, y mas.

## Ejecucion

- **"start"**: `tsx ./src/app.ts`.
- **"dev"**: `tsx watch ./src/app.ts`

