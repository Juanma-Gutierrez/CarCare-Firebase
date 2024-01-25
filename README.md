# Proyecto Car Care app

Proyecto realizado para la asignatura de Acceso a datos de 2º de Desarrollo de aplicaciones móviles (DAM).

La aplicación está realizada en Angular e Ionic, utiliza una base de datos de Strapi y está en producción en netlify. También utiliza Capacitor para el almacenamiento local en caché del navegador.

Link en producción: [https://carcare-project.netlify.app](https://carcare-project.netlify.app/)

## Tecnologías Utilizadas

- **Angular CLI:** Versión 16.2.10
- **Node:** Versión 18.17.0# **Autenticación**
- **Ionic CLI:** Versión 7.1.1
- **Ionic Framework:** Versión 7.5.4
- **Capacitor CLI:** Versión 5.5.1
- **Strapi:** Versión 3.6.11


# **Requisitos del proyecto**

## Tecnologías a usar

### FrontEnd:

Angular + Ionic + Capacitor

### BackEnd:

Strapi desplegado de forma pública en la red

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

- Un servicio de api que contiene la lógica necesaria para comunicarse con el backend (en nuestro caso los endpoints de la api de strapi)

### HttpClientWebProvider (HttpClientProvider)

- Un servicio de Http para browser que envuelve las llamadas a HttpClient

### JwtService

- Un servicio para manejar los tokens jwt necesarios para el acceso a métodos privados de strapi. Deberá almacenar el token en el almacenamiento interno del navegador.

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

Documentación completa del proyecto:

https://juanma-gutierrez.github.io/CarCareDocumentation/

# Proyecto en marcha

Link al video demostrativo del funcionamiento de la aplicación.

https://www.youtube.com/watch?v=BkaSsS3durw


La aplicación inicia con un control de acceso, ya que comprueba si tiene JWT almacenado en la caché. Si lo tiene, te redirige a la página principal de la aplicación. En caso contrario, te lleva a la página de login y registro.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/0c35df5a-3369-4784-940f-09b3a88a016f)

Una vez dentro de la aplicación, el usuario podrá dar de alta vehículos, proveedores y cuando ya tenga tanto proveedores como vehículos, podrá crear gastos asignados al vehículo que indique.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/d596c874-f619-47e3-a749-fe889fea81c4)

Pantalla inicial con el menú desplegado.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/4a7ce6ed-08b8-498c-ba21-291296434658)

Ventana modal de creación, edición y eliminación de vehículos.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/c564d2ba-4e18-4c52-8992-fa06c8878e42)

Ventana modal de creación, edición y eliminación de gastos.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/b142cb11-7576-49e6-a7c2-bd5433d63715)

Pantalla de vehículos.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/6bf7308f-240d-4fc9-9bd8-b71fb00e9821)

Pantalla de proveedores.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/93ee9c7e-48c2-4b55-96df-d08aa7a5c7e1)

Pantalla de creación, edición y eliminación de proveedores.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/2d00624a-b750-4bb0-a605-9e92973a94e9)

Página 'Sobre mí'

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/ea974c04-1b0d-4988-813c-9449bf0c2cf7)

Página inicial con el servicio de traducción en inglés.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/cd79a021-ea1e-440d-a031-5d58a9f864eb)

Modo responsive en móvil.

![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/1f2d73f9-b4a0-4634-8848-dcf56cee2bd6)


![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/ec5a1a9a-267e-4ced-8769-90fa60f8c84d)


![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/71463a9a-8fe5-43a7-913b-b452fcff2fef)


![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/d4e45744-d634-4936-8744-cc81ece4299e)



Captura del SplashScreen con el que se inicia la aplicación.


![image](https://github.com/Juanma-Gutierrez/CarCare/assets/101201349/766ae4b3-a325-486e-91d4-bd720950ea0c)














