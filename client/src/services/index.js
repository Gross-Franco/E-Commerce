
// Nota: esto solo esta de ejemplo para la consulda a la base de datos
export async function getDiets(){
    return await axios.get('http://localhost:3001/types');
}