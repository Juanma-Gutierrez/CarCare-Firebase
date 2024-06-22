# Proyecto Car Care app

Proyecto realizado para la asignatura de Acceso a datos de 2º de Desarrollo de aplicaciones móviles (DAM).

La aplicación está realizada en Angular e Ionic, utiliza una base de datos de Firebase y está en producción en Netlify. También utiliza servicios de Capacitor.

Link en producción: [https://carcare-firebase.netlify.app](https://carcare-firebase.netlify.app/)

# Repositorios

-   Repositorio de la aplicación en versión web:
    -   https://github.com/Juanma-Gutierrez/CarCare-Firebase
-   Repositorio de la aplicación en versión móvil:
    -   https://github.com/Juanma-Gutierrez/CarCare-Kotlin

# Videos del proyecto final en funcionamiento

-   Enlace al video del proyecto final. [Proyecto TFC 2º DAM CarCare](https://youtu.be/PisM8MGJCOs)
-   Enlace a video para el checkpoint. [Checkpoint Proyecto TFC 2º DAM CarCare](https://youtu.be/zupeu_2-FIM)

## Tecnologías Utilizadas

Ionic:

   Ionic CLI                     : 7.2.0
   Ionic Framework               : @ionic/angular 7.5.4
   @angular-devkit/build-angular : 16.2.10
   @angular-devkit/schematics    : 16.2.10
   @angular/cli                  : 16.2.10
   @ionic/angular-toolkit        : 9.0.0

Capacitor:

   Capacitor CLI      : 5.5.1
   @capacitor/android : 5.5.1
   @capacitor/core    : 5.6.0
   @capacitor/ios     : not installed

Utility:

   cordova-res : not installed globally
   native-run  : 1.7.4

System:

   NodeJS : v20.11.0
   npm    : 10.2.4
   OS     : Windows 10

# **Requisitos del proyecto**

Toda la información sobre requisitos del proyecto se encuentra en este [repositorio](https://github.com/CPIFPAlanTuring/2dam-tfc-2324).

## Tecnologías a usar

### FrontEnd:

Angular + Ionic + Capacitor

### BackEnd:

Servicio de autenticación de Firebase y base de datos Firestore Database desplegado de forma pública en la red.

## Núcleo de la app

- Crea un core en tu aplicación donde se añadirán los servicios y utilidades que no dependen de un módulo y que pueden ser importados desde cualquier sitio. (Servicios, interfaces, etc…). Puedes llamarlo core.

## Módulos

- Cada página debe ser un módulo independiente.
- Tienes que tener un módulo compartido donde añadirás todo aquello que pueda ser usado en otros módulos. (componentes, directivas y pipes). Puedes llamarlo SharedModule.

## Servicios

### Autenticación

- Un servicio de autenticación con opciones para hacer login, logout y registro.

### Acceso a datos

- Un servicio por cada modelo de datos de la base de datos con métodos para poder hacer las operaciones CRUD sobre dicho modelo.

### ApiService

- Un servicio de api que contiene la lógica necesaria para comunicarse con el backend.

### HttpClientWebProvider (HttpClientProvider)

- Un servicio de Http para browser que envuelve las llamadas a HttpClient

### LocalService

- Un servicio para manejar el idioma con el que se carga la aplicación. Deberá guardar la configuración del idioma seleccionado en el almacenamiento interno del navegador. Hace uso del servicio TranslateService para establecer el idioma seleccionado.

### TranslateService

- Haz uso de este servicio incluido en el paquete @ngx-translate/core para ello sigue las instrucciones que el profesor te dio en clases para importar el servicio de forma forRoot y forChild en cada uno de los módulos.

## Directivas

Crea al menos una directiva personalizada.

Haz uso de al menos 2 de las directivas siguientes:

- ngIf (obligatoria)
- ngFor (obligatoria)
- ngStyle (opcional)
- ngClass (opcional)

## Pipes

- Crea al menos un pipe personalizado y haz uso del mismo en tu app.
- Usa los pipes de angular (uppercase, translate, date, …)

## Componentes

- Crea componentes para contener las páginas, formularios para editar o añadir datos, visualización de registros de las tablas etc…
- Haz uso de la interfaz ControlValueAccessor en algún componente y úsalo dentro de algún formulario reactivo.

## Formularios Reactivos

- Crea al menos un formulario reactivo por cada modelo de datos que tengas.

## Modales

- Haz uso de los modales por ejemplo para los formularios reactivos o para otra cosa que se te ocurra.

## Páginas

Habrá al menos:

- Una página de login
- Una página de registro
- Una página de horme
- Una página de about. Tiene que tener información sobre la app y el desarrollador, con enlaces externos que se abrirán en otra pestaña.
- Una página por cada modelo de datos

## Enrutamiento

- Organiza tus páginas en el enrutador de la aplicación y protege las mismas que necesiten un usuario autenticado mediante una **guarda** que debes implementar.

## Interfaz de usuario

- Tu app debe ser responsiva.
- Haz uso de los componentes de ionic.
- Configura el tema de ionic para cambiar los colores corporativos que se añaden por defecto.
- Haz uso de componentes de PrimeNg (opcional).

# Documentación del proyecto

En la carpeta documentation del repositorio está disponible la documentación del proyecto.

Éste ese un resumen de los principales elementos utilizados en la aplicación.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/0f162392-c52b-426e-a78f-09e80c653d11)


## Detalle de la aplicación

### Login

![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/b4a54d53-8d24-4b26-b520-220cc50703ab)

-   La aplicación cuenta con una pantalla de login para iniciar la sesión.
-   El login se realiza con correo electrónico y contraseña.
-   El correo electrónico queda almacenado en localstorage del navegador.
-   Si se introducen mal los datos, se muestra un aviso de error.
![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/a254ca66-93ac-4b10-81e4-62673d829dc7)

### Pantalla de Registro

![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/2605ff10-c111-463a-abf0-e2be81995e88)

-   La aplicación cuenta con una pantalla para registrar usuarios.
-   Se controla que se introduzcan correctamente todos los datos.
-   Hay control especial sobre la contraseña, solicita que tenga al menos una mayúscula, una minúscula, un número y 8 dígitos.
-   Durante el proceso de inserción de la contraseña se va indicando si se cumplen los requisitos. Si cumple correctamente se muestra en pantalla.

    <img src="https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/b1171d61-9009-451f-b00b-1e20607c828f" width="300"/>

### Barra de `Menú principal`

![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/24c4f4ee-fe54-4e65-b92d-d84bef90e9b1)

-   Se muestra en toda la aplicación.
-   Incluye botón para traducir la aplicación entre español e inglés.
-   Si el usuario está logueado con el rol de Administrador, se mostrará la opción `Administración`.
-   Permite el cierre de sesión del usuario.

### Pantalla `Inicio`

![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/571dad78-27e6-485e-8dd1-5e4114c7d349)

-   En la parte izquierda de la pantalla hay un listado con los vehículos registrados a nombre del usuario. Este listado se puede filtrar entre los vehículos disponibles o todos los registrados, incluyendo los no disponibles.
-   Las imágenes de los vehículos se encuentran cargadas en Firebase Storage. Si no existe imagen asociada al vehículo, se muestra una imagen placeholder de la categoría del vehículo.
-   Cuando se hace click en un vehículo, en la parte derecha se muestran su marca y modelo, así como el total gastado y el número de gastos. Debajo de la cabecera de los gastos se muestra el listado de gastos asociados.
-   En esta pantalla hay acceso al formulario de alta, edición y borrado de vehículos y de gastos.
    ![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/cd223b78-06fc-438f-8aef-7d3292840747)
    ![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/3e232a1f-e581-4463-8c6b-d1df26bd6114)

### Pantalla `Vehículos`

![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/3f552e74-a7f2-4e45-aca9-8ad0009c3c7f)

-   Se muestra un listado con todos los vehículos disponibles, así como información detallada de los mismos.
-   Las categorías se muestran tanto con un campo de texto como con un icono representativo.
-   Los vehículos no disponibles se mostrarán con un texto indicativo y un efecto en la tarjeta para mostrar dicho estado.
-   Existe un botón de compartir mediante el cual se puede enviar el listado de vehículos a cualquier aplicación admitida en el dispositivo.

### Pantalla `Proveedores`

![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/4b30f543-9774-4629-9f62-354c19517c37)

-   Muestra un listado de los proveedores, así como la categoría a la que pertenece y su teléfono de contacto.
-   En esta pantalla se puede dar de alta, editar y eliminar cualquier proveedor mediante el formulario dinámico correspondiente.

![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/0897b762-f93a-4b48-b0db-30bf7e94c03b)

### Pantalla `Sobre mí`

![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/9332c34f-d498-4992-81f8-e311f0e4372b)

-   Pantalla con información del autor de la aplicación.
-   Incluye enlace a GitHub y a Linkedin del autor.

### Pantalla `Administración`

![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/9ad14a85-f07b-42a3-a430-66a447701de3)

-   Pantalla de administración a la que se puede acceder únicamente si el usuario logueado tiene el rol de Administrador.
-   Hay un botón de exportación de datos, que exporta un archivo en formato `.CSV` con el registro de la aplicación.
-   El formato de exportación sería el siguiente:
    ![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/65afcd31-041e-44f0-bdb8-00c65f3bf8f6)
-   Se incluyen tres gráficas, con las marcars de los vehículos más utilizados, número de vehículos por categoría y porcentaje de vehículos por categoría.
-   Se muestra una tabla con el listado de usuarios, así como los vehículos que tiene registrados cada uno de ellos.
-   En el caso del administrador, se muestra con un icono indicativo junto al nombre.
    ![image](https://github.com/Juanma-Gutierrez/TFC-2DAM-CarCare/assets/101201349/4339aba8-0833-4cfc-bbf4-bc3c2e9af8ec)
