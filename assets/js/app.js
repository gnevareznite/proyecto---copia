// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDp0zMGehtaBWfvW5X_5bcT0r4uMeyYpB8",
    authDomain: "proyprog2.firebaseapp.com",
    databaseURL: "https://proyprog2-default-rtdb.firebaseio.com",
    projectId: "proyprog2",
    storageBucket: "proyprog2.appspot.com",
    messagingSenderId: "401029084723",
    appId: "1:401029084723:web:d6a9175ca65985249e5546"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

$(document).ready(function() {
    console.log("Página cargada");

    // Consultar base de datos
    cargarBD();
});

// Consulta la base de datos y arma el listado
function cargarBD() {
    $('#expedientes tbody').empty();

    const expedientes = db.collection("Expedientes").orderBy("expediente");
    expedientes.get().then((snap) => {
        snap.forEach(doc => {
            const dato = doc.data();

            var htmlTags = '<tr>'+
                '<td><a href="#" onclick="mostrar(\''+doc.id+'\')">' + dato.expediente + '</a></td>'+
                '</tr>';
        
            $('#expedientes tbody').append(htmlTags);
        });
    });
}

// Guarda la información del expediente en la BD
function guardarInfo() {
    var dato = new Object();
    var valid = validarFormulario();

    if (!valid) {
            console.log("Faltan datos en el formulario");
            return;
    }

    dato.expediente = $('#expediente').val();
    dato.nombre = $('#nombre').val();
    dato.causa = $('#causa').val();
    dato.telefono1 = $('#telefono1').val();
    dato.telefono2 = $('#telefono2').val();
    dato.email = $('#email').val();
    dato.sipe = $('#sipe').val();
    dato.comentario = $('#comentarios').val();

    // Validar que tenga información
    if (dato.expediente.trim() == '') {
        $('#expediente').addClass('invalid');
        valid = false;
    }
    else {
        $('#expediente').addClass('valid');
    }

    console.log(dato);

    $('#btnGuardar').html('<i class="fas fa-hourglass spin"></i>');
    addDataDB(dato);
    cargarBD();
    $('#btnGuardar').html('Guardar');
    resetearFormulario();
}

function mostrar(id) {
    console.log(id);

    const docRef = db.collection("Expedientes").doc(id);

    docRef.get().then((doc)=>{
        if (doc.exists) {
            const dato = doc.data();
            const informacion = '<div class="row"><div class="col-5 bold">Expediente:</div><div class="col">'+dato.expediente+'</div></div>' +
                                '<div class="row"><div class="col-5 bold">Nombre:</div><div class="col">'+dato.nombre+'</div></div>' +
                                '<div class="row"><div class="col-5 bold">Causa:</div><div class="col">'+dato.causa+'</div></div>' +
                                '<div class="row"><div class="col-5 bold">Tel 1:</div><div class="col">'+dato.telefono1+'</div></div>' +
                                '<div class="row"><div class="col-5 bold">Tel 2:</div><div class="col">'+dato.telefono2+'</div></div>' +
                                '<div class="row"><div class="col-5 bold">Correo:</div><div class="col"> '+dato.email+'</div></div>' +
                                '<div class="row"><div class="col-5 bold">SIPE: </div><div class="col">'+dato.sipe+'</div></div>' +
                                '<div class="row"><div class="col-5 bold">Comentarios:</div><div class="col"></div></div>' +
                                '<div class="row justificado"><p>'+dato.comentario+'</p></div>';
            
            $('#informacion').html(informacion);
    
            // Desplazar para visualizar la sección
            // no funciona en dispositivo movil
            const offsetTop = document.querySelector('#listado').offsetTop;
            console.log(offsetTop);
            window.scroll({
                top: offsetTop,
                behavior: "smooth"
            });
        }
        else {
            console.log("El documento no existe");
        }
    }).catch((error) => {
        console.error("Error al obtener el expediente: ", error);
    });

}

function addDataDB(dato) {

    db.collection("Expedientes").add(dato).then((docRef) => {
        console.log("Expediente agregado con el id: ", docRef.id);
    }).catch((error) => {
        console.error("Error al agregar el expediente: ", error);
    });

    // const expedientes = db.ref().child('Expedientes');
    // expedientes.set({expediente: dato.expediente});

}

function validarFormulario() {
    var valid = true;

    $('#formulario').addClass('was-validated');
    $('#formulario').removeClass('needs-validation');

    if ($('#expediente').val().trim() == '') {
        $('#expediente').addClass('invalid');
        valid = false;
    }
    else {
        $('#expediente').addClass('valid');
    }
    if ($('#nombre').val().trim() == '') {
        $('#nombre').addClass('invalid');
        valid = false;
    }
    else {
        $('#nombre').addClass('valid');
    }
    if ($('#causa').val().trim() == '') {
        $('#causa').addClass('invalid');
        valid = false;
    }
    else {
        $('#causa').addClass('valid');
    }
    if ($('#telefono1').val().trim() == '') {
        $('#telefono1').addClass('invalid');
        valid = false;
    }
    else {
        $('#telefono1').addClass('valid');
    }
    if ($('#telefono2').val().trim() == '') {
        $('#telefono2').addClass('invalid');
        valid = false;
    }
    else {
        $('#telefono2').addClass('valid');
    }
    if ($('#email').val().trim() == '') {
        $('#email').addClass('invalid');
        valid = false;
    }
    else {
        $('#email').addClass('valid');
    }
    if ($('#sipe').val().trim() == '') {
        $('#sipe').addClass('invalid');
        valid = false;
    }
    else {
        $('#sipe').addClass('valid');
    }
    if ($('#comentarios').val().trim() == '') {
        $('#comentarios').addClass('invalid');
        valid = false;
    }
    else {
        $('#comentarios').addClass('valid');
    }

    return valid;
}

function resetearFormulario() {
    // Cambiar la clase del formulario de was-validated a needs-validation
    $('#formulario').addClass('needs-validation');
    $('#formulario').removeClass('was-validated');

    // Limpiar los controles
    $('#expediente').val('');
    $('#nombre').val('');
    $('#causa').val('');
    $('#telefono1').val('');
    $('#telefono2').val('');
    $('#email').val('');
    $('#sipe').val('');
    $('#comentarios').val('');

    // Retirar las clases de los controles
    // class .invalid
    $('#expediente').removeClass('invalid');
    $('#nombre').removeClass('invalid');
    $('#causa').removeClass('invalid');
    $('#telefono1').removeClass('invalid');
    $('#telefono2').removeClass('invalid');
    $('#email').removeClass('invalid');
    $('#sipe').removeClass('invalid');
    $('#comentarios').removeClass('invalid');
    // class .valid
    $('#expediente').removeClass('valid');
    $('#nombre').removeClass('valid');
    $('#causa').removeClass('valid');
    $('#telefono1').removeClass('valid');
    $('#telefono2').removeClass('valid');
    $('#email').removeClass('valid');
    $('#sipe').removeClass('valid');
    $('#comentarios').removeClass('valid');
}

// Cargar el Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", f => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(res => {
                console.log("Service Worker registrado");
                registration.scope;
            })
            .catch(err => {
                console.log("Service worker no registrado: ", err);
            });
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(function(registration) {
        console.log(
          'Service Worker registration successful with scope: ',
          registration.scope
        );
      })
      .catch(function(err) {
        console.log('Service Worker registration failed: ', err);
      });
  }



/*
nst informacion = '<span>Expediente: '+dato.expediente+'</span><br>' +
                            '<span>Nombre: '+dato.nombre+'</span><br>' +
                            '<span>Causa: '+dato.causa+'</span><br>' +
                            '<span>Teléfono 1: '+dato.telefono1+'</span><br>' +
                            '<span>Teléfono 2: '+dato.telefono2+'</span><br>' +
                            '<span>Correo: '+dato.email+'</span><br>' +
                            '<span>SIPE: '+dato.sipe+'</span><br>' +
                            '<span>Comentarios:</span><br>' +
                            '<p>'+dato.comentario+'</p>';
                            */