window.onload = inicializar;
var formConvalidaciones;
var refConvalidaciones;
var tbodyTablaConvalidaciones;

function inicializar(){
    formConvalidaciones = document.getElementById("form-convalidaciones");

    formConvalidaciones.addEventListener("submit", enviarConvalidacionAFirebase, false);

    tbodyTablaConvalidaciones = document.getElementById("tbody-tabla-convalidaciones");

   refConvalidaciones = firebase.database().ref().child("convalidaciones");

   mostrarConvalidacionesDeFirebase();

   borrarConvalidacionDeFirebase();
}

function mostrarConvalidacionesDeFirebase(){
    refConvalidaciones.on("value", function(snap){
        var datos = snap.val();
        var filasAMostrar ="";
        for(var key in datos){
            filasAMostrar += "<tr>" +
            "<td>" + datos[key].cicloAConvalidar + "</td>" +
            "<td>" + datos[key].moduloAConvalidar + "</td>" +
            "<td>" + datos[key].cicloAportado + "</td>" +
            "<td>" + datos[key].moduloAportado + "</td>" +
            '<td><span class="glyphicon glyphicon-trash"></span></td>' +
            '<td>' +
            '<button class="btn btn-danger">' +
                '<span class="glyphicon glyphicon-trash"></span>' + 
                '</button>' +
                 '</td>' +
            "</tr>";
        }
        tbodyTablaConvalidaciones.innerHTML = filasAMostrar;
        if(filasAMostrar != ""){
            var elementosBorrables = document.getElementsByClassName("borrar");
            for(var i = 0; i < elementosBorrables.length; i++){
                elementosBorrables[i].addEventListener("click", borrarConvalidacionDeFirebase, false);
            }
        }
    });
}

function borrarConvalidacionDeFirebase(){
    var keyDeConvalidacionABorrar = thisAttribute("data-convalidacion");
    var refconvalidacionABorrar = refConvalidaciones.child(keyDeConvalidacionABorrar);
    refConvalidacionABorrar.remove();
}

function enviarConvalidacionAFirebase(event){
    event.preventDefault();
    refConvalidaciones.push({
        moduloAConvalidar: event.target.moduloAConvalidar.value,
        cicloAConvalidar: event.target.cicloAConvalidar.value,
        moduloAportado: event.target.moduloAportado.value,
        cicloAportado: event.target.cicloAportado.value
    });
    formConvalidaciones.reset();
}

