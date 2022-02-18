export function verificarUsuario(usuarios,usuario){
    console.log(usuario)
    console.log("-------------")
    console.log(usuarios)
    for(let i=0;i<usuarios.length;i++){
        // eslint-disable-next-line eqeqeq
        if(usuarios[i].email===usuario.email && usuarios[i].password===usuario.contraseña){
            return true;
        }
    }
    return false;
}
