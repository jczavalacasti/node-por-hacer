const fs = require('fs');

let listdoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listdoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar');
    })
}

const cargarDB = () => {
    try {
        listdoPorHacer = require('../db/data.json');
    } catch (error) {
        listdoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listdoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listdoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB(); // cargar el arreglo que contiene la BD

    let index = listdoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listdoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB(); // cargar el arreglo que contiene la BD

    let nuevoListado = listdoPorHacer.filter(tarea => {
        return tarea.descripcion != descripcion;
    })

    if (listdoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listdoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}