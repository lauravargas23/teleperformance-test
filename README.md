# teleperformance-test
Test back-end

## Development server

### Angular application
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Esta aplicación utiliza todas las API. En la sección Free Api valida la extensión de la imagen generada. Los archivos .Gif y .mp4 no son extensiones validas para el visor de imagenes. The login section use the API to validate and authenticate users sessions. The technologies section add, list, modify and delete objects from the database and need the user authentication.
### Authorization and database conection API's
Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/`. Execute the API technologies, this allow you list, add, edit, modify, and delete technologies, the api need authentication to manipulate the info, also includes the API to generate tokens to protect the urls . 
### Free API
Run `npm run free` for a dev serve. Navigate to `http://localhost:3100/`. This allow consume a free API, this free API offer random images of dogs.
