// import { getData } from './utilities';
let products = []

const addToFavorites = ( item ) => {
  try {

    // leo la lista de favoritos de local storage
    const favoritesStorage = localStorage.getItem( 'favorites' )
    const favorites = JSON.parse( favoritesStorage );

    // verifico si existe un producto con ese id, en caso de que exista aviso y salgo de la funcion
    const found = favorites.find( product => product.id == item.id )
    if ( found ) {
      const newFavorites = favorites.filter( product => product.id !== item.id )
      localStorage.setItem( 'favorites', JSON.stringify( newFavorites ) )
      return false
    }

    // si paso los filtros anteriores ya puedo agregar a favoritos
    // lo agrego al arreglo y lo guardo en el localStorage.

    favorites.push( item )
    localStorage.setItem( 'favorites', JSON.stringify( favorites ) )
    return true
  } catch ( error ) {

    // en caso de entrar al catch, seria porque no puede leer esa key en el Storage
    // para solucionarlo igualo favorites a un array vacio y llamo recursivamente a la funcion
    const favorites = []
    localStorage.setItem( 'favorites', JSON.stringify( favorites ) )
    addToFavorites( item )
  }
}

const favoriteAlert = () => {
  Swal.fire( {
    title: 'Product added to favorites',
    icon: 'success',
    timer: 2000
  } );
}

// getData()
const appContainer = document.querySelector( '.app' )

fetch( `https://fakestoreapi.com/products/` ) // -> En caso de fallo en la API usar archivo mockup.json 
  .then( res => res.json() )
  .then( json => {
    products = json
    products.map( product => {
      const productContainer = document.createElement( 'div' )
      productContainer.classList.add( 'product-container' )

      const productTitleContainer = document.createElement( 'strong' )
      const productDescContainer = document.createElement( 'span' )
      const productImgContainer = document.createElement( 'img' )
      const heartContainer = document.createElement( 'img' )
      heartContainer.src = './img/corazon.png';
      heartContainer.classList.add( 'heart-img' )
      productImgContainer.classList.add( 'product-img' )

      productImgContainer.src = product.image;
      productDescContainer.textContent = product.description;

      productTitleContainer.innerHTML = product.title;

      heartContainer.addEventListener( 'click', () => {
        const added = addToFavorites( product )
        if ( added ) {
          heartContainer.classList.add( 'like' )
          favoriteAlert();
          console.log( 'funciona' )
          console.log( product.id )
          setTimeout( () => {
            heartContainer.classList.remove( 'like' )
          }, 1000 );
        }
      } )
      productContainer.append( heartContainer )
      productContainer.append( productImgContainer )
      productContainer.append( productTitleContainer )
      productContainer.append( productDescContainer )
      appContainer.append( productContainer )
      return
    } )
  } )