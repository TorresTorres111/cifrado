
'use strict'

// valiables principales
const errTxtC = document.querySelector( '#errTxtC' );
const errNumC = document.querySelector( '#errNumC' );
const cifrarC = document.querySelector( '#cifrarC' );
const descifrarC = document.querySelector( '#descifrarC' );
const salidaC = document.querySelector( '#salidaC' );



// expresiones
const txtExpC = /^[a-zA-ZÑñ ]*$/;


// validacionTxtC
const validacionTxtC = () => {

    const txtC = document.querySelector( '#txtC' ).value;
    if ( txtC.length <= 0 ) {
        errTxtC.innerHTML = 'Ingrese un valor';
        return false;
    } else if ( txtC.length > 100 ) {
        errTxtC.innerHTML = 'El texto debe de ser menor a 100 caracteres';
        return false;
    } else if ( !txtExpC.test( txtC ) ) {
        errTxtC.innerHTML = 'Solo se permiten letras y espacios';
        return false;
    } else {
        errTxtC.innerHTML = '';
        return txtC.toLowerCase();
    };

};


// validacionNumC
const validacionNumC = () => {

    let numC = document.querySelector( '#numC' ).value;
    const numCParse = parseInt( numC );
    if ( numC.length <= 0 ) {
        errNumC.innerHTML = 'Ingrese el desplazamiento';
        return false;
    } else if ( numCParse < 1  ) {
        errNumC.innerHTML = 'El desplazamiento debe ser mayor a 0';
        return false;
    } else if ( numCParse > 27 ) {
        errNumC.innerHTML = 'El desplazamiento debe ser menor a 28';
        return false;
    } else {
        errNumC.innerHTML = '';
        errNumC.innerHTML = `El desplazamiento sera ${ numCParse }`;
        return numCParse;
    }

};


// remplazoCaracterC
const abecedarioC = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
const remplazoCaracterC = ( c, desplazamiento, accion ) => {

    let i = abecedarioC.indexOf( c );
    if ( i != -1 ) {
        let posicion = i;
        if ( accion ) {
            posicion += desplazamiento;
            posicion -= ( posicion >= abecedarioC.length )
                ? abecedarioC.length
                : 0
        } else {
            posicion -= desplazamiento;
            posicion += ( posicion < 0 )
                ? abecedarioC.length
                : 0
        };
        return abecedarioC[ posicion ]
    };
    return c;

};


// heyCoders
const heyCodersC = async( txt, desplazamiento, accion ) => {

    let txtResultante = '';
    for ( let i = 0; i < txt.length; i++ ) {
        const c = await remplazoCaracterC( txt[ i ] ,desplazamiento, accion );
        txtResultante += c;
    };
    return txtResultante

};


// cifrar
cifrarC.addEventListener( 'click', async( ) => {

    const txtC = await validacionTxtC();
    const numC = await validacionNumC();
    if ( txtC && numC ) {
        const textoCifradoC = await heyCodersC( txtC, numC, true );
        salidaC.value = textoCifradoC;
    };

});


// descrifrar
descifrarC.addEventListener( 'click', async( ) => {

    const txtC = await validacionTxtC();
    const numC = await validacionNumC();
    if ( txtC && numC ) {
        const textoDescifradoC = await heyCodersC( txtC, numC, false );
        salidaC.value = textoDescifradoC;
    };

});



