const readFavorites = () => {
  try {

    let noContent = document.getElementById( 'no-elements' )
    noContent.innerHTML = ''
    // leo el localStorage
    const favoritesStorage = localStorage.getItem( 'favorites' )
    const favorites = JSON.parse( favoritesStorage );

    if ( favorites.length == 0 ) {
      noContent.innerHTML = `NO ELEMENTS TO SHOW`
      noContent.classList.add( 'show' )
      return
    }
    // recorro el array que obtuve del storage y por cada elemento creo un li que insertare en la lista que obtuve al inicio
    // adicionalmente voy a agregar un boton que va a escuchar el evento click para llamar a la funcion handleDelete
    noContent.classList.remove( 'show' )
    favorites.forEach( product => {
      const favListContainer = document.querySelector( '.app' )
      const productContainer = document.createElement( 'div' )
      productContainer.classList.add( 'product-container' )

      const productTitleContainer = document.createElement( 'strong' )
      const productDescContainer = document.createElement( 'span' )
      const productImgContainer = document.createElement( 'img' )
      productImgContainer.classList.add( 'product-img' )

      productImgContainer.src = product.image;
      productDescContainer.textContent = product.description;

      productTitleContainer.innerHTML = product.title;

      productContainer.append( productImgContainer )
      productContainer.append( productTitleContainer )
      productContainer.append( productDescContainer )
      favListContainer.append( productContainer )
      return
    } );

  } catch ( error ) {
    // en caso de que haya un error para leer el localStorage (la primera vez siempre va a haber ya que no deberias tener tareas cargadas si no usaste la app)
    // muestro el mensaje de que no hay.
    let noContent = document.getElementById( 'no-elements' )
    noContent.innerHTML = `NO ELEMENTS TO SHOW`
  }
}
window.addEventListener( "load", readFavorites );