# Proyecto Car Care app

Proyecto realizado para la asignatura de Acceso a datos de 2º de Desarrollo de aplicaciones móviles (DAM).

La aplicación está realizada en Angular e Ionic, utiliza una base de datos de Firebase y está en producción en Netlify. También utiliza servicios de Capacitor.

Link en producción: [https://carcare-firebase.netlify.app](https://carcare-firebase.netlify.app/)

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


# Proyecto en marcha

Link al video demostrativo del funcionamiento de la aplicación.

https://www.youtube.com/watch?v=BkaSsS3durw

La aplicación inicia con un control de acceso, ya que comprueba si el usuario está autenticado en Firebase. Si lo está, lo redirige a la página principal de la aplicación. En caso contrario, lo lleva a la página de login y registro.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/f976bd47-5821-4c52-b4b5-e5422696b6af)

Una vez dentro de la aplicación, el usuario podrá dar de alta vehículos, proveedores y cuando ya tenga tanto proveedores como vehículos, podrá crear gastos asignados al vehículo que indique.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/1cce58a7-71bc-4362-9863-8a1f4bad6186)

Pantalla inicial con el menú desplegado.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/1bea72e2-c608-481f-b165-c6edfc6a3a23)

Ventana modal de creación, edición y eliminación de vehículos.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/26c34911-9032-41de-b9dd-5ba63fc5baea)

Ventana modal de creación, edición y eliminación de gastos.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/be5691fb-02fb-43b1-818e-c71cf5775920)

Pantalla de vehículos.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/ce881b9f-b0bf-4444-b786-66849d915683)

Pantalla de proveedores.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/37d565aa-89fa-463d-a2e8-82f4660834d5)

Pantalla de creación, edición y eliminación de proveedores.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/5dfccd53-e6d2-4665-b72b-73f04ecdd5df)

Página 'Sobre mí'.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/ada08c92-4f36-48ac-87db-2865865b40d2)

Página de administración.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/e685c3f0-9128-413e-a252-94d6f6254afc)

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/8c73ada8-2455-4a2d-abf8-1916551b9be1)

Página inicial con el servicio de traducción en inglés.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/84e52342-6b7a-40d6-87fe-80729a72626c)

Modo responsive en móvil.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/c79fb927-c44b-4c36-bbeb-4d910cc49693)

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/5cacf14f-2d98-43e6-8426-11bd470bad54)

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/ce6a72d1-5829-4930-826a-b3b724afa3fa)

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/ad3b3b90-d93b-4e1e-8c58-a907d0256777)

Captura del SplashScreen con el que se inicia la aplicación.

![image](https://github.com/Juanma-Gutierrez/CarCare-Firebase/assets/101201349/a46dfe0f-d6bc-4121-acc1-94eaea2e1cc3)
