function ingresar(){

        var usuario = (document.getElementById('usuario')).value;
        var contraseña = (document.getElementById('contraseña')).value;

        if(usuario === 'cecytem' && contraseña ==='carrerininsano'){
  
alert('has ingresado')
window.open('ww1.html')


        }
        else{
            alert('contraseña o usuario incorrecto')

            document.getElementById('usuario').value="";
            document.getElementById('contraseña').value="";
        }
    }
