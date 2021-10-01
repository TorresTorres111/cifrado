
'use strict'

// valiables principales
const errTxtV = document.querySelector( '#errTxtV' );
const errKeyV = document.querySelector( '#errKeyV' );
const cifrarV = document.querySelector( '#cifrarV' );
const descifrarV = document.querySelector( '#descifrarV' );
const salidaV = document.querySelector( '#salidaV' );


// expresiones
const txtExpV = /^[a-zA-ZÑñ ]*$/;
const keyExpV = /^[a-zA-ZÑñ]*$/;


// validacionTxtV
const validacionTxtV = () => {

    const txtV = document.querySelector( '#txtV' ).value;
    if ( txtV.trim().length <= 0 ) {
        errTxtV.innerHTML = 'Ingrese un valor';
        return false;
    } else if ( txtV.length > 100 ) {
        errTxtV.innerHTML = 'El texto debe de ser menor a 100 caracteres';
        return false;
    } else if ( !txtExpV.test( txtV ) ) {
        errTxtV.innerHTML = 'Solo se permiten letras y espacios'
        return false;
    } else {
        errTxtV.innerHTML = '';
        return txtV.trim().toLowerCase();
    };

};


// validacionKeyV
const validacionKeyV = () => {

        const keyV = document.querySelector( '#keyV' ).value;
    if ( keyV.length <= 0 ) {
        errKeyV.innerHTML = 'Ingrese la llave';
        return false;
    } else if ( keyV.length > 20 ) {
        errKeyV.innerHTML = 'La llave debe ser menor a 20 caracteres';
        return false;
    } else if ( !keyExpV.test( keyV ) ) {
        errKeyV.innerHTML = 'Solo se permiten letras'
        return false;
    } else {
        errKeyV.innerHTML = '';
        return keyV;
    };

};


// algo
const abecedarioV = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
const algo = ( txtV, keyV, accion ) => {

    txtV = txtV.replace(/ /g, '');
    let newTxtV = '';
    let newKeyV = '';

    for ( let i = 0; i < txtV.length; i++ ) {
        newKeyV += keyV.charAt(( i%Number( keyV.length )));
    };

    for ( let i = 0; i < txtV.length; i++ ) {
        let c = txtV.charAt( i );
        let posicionTxtV = getPosition( c );
        c = newKeyV.charAt( i );
        let posicionKeyV = getPosition( c );

        // algoritmo ahora si
        let heyCodersV = change( posicionTxtV, posicionKeyV, accion );
        newTxtV += abecedarioV[ heyCodersV ];
    };
    return newTxtV;

};


// change
const change = (  posicionTxtV, posicionKeyV, accion ) => {

    if ( accion ) {
        let y = ( posicionTxtV + posicionKeyV )%27;
        return y;
    };
    if ( !accion ) {
        let y = 0;
        if ( ( posicionTxtV - posicionKeyV ) >= 0 ) {
            y = ( posicionTxtV - posicionKeyV )%27;
        } else {
            y = ( posicionTxtV - posicionKeyV + 27 )%27;
        }
        return y;
    }

};


// getPosition
const getPosition = ( c ) => {

    let posicion = abecedarioV.indexOf( c );
    if ( posicion !== -1 ) {
        return posicion;
    };

};


// cifrar
cifrarV.addEventListener( 'click', async( ) => {

    const txtV = await validacionTxtV();
    const keyV = await validacionKeyV();
    if ( txtV && keyV ) {
        const textoCifrado = await algo( txtV, keyV, true );
        salidaV.value = textoCifrado;
    };

});


// descrifrar
descifrarV.addEventListener( 'click', async( ) => {

    const txtV = await validacionTxtV();
    const keyV = await validacionKeyV();
    if ( txtV && keyV ) {
        const textoDescifrado = await algo( txtV, keyV, false );
        salidaV.value = textoDescifrado;
    };

});


