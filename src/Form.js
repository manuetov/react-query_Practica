import { useMutation } from "react-query";
import { useQueryClient } from 'react-query'

export default function Form() {
   const queryClient = useQueryClient(); // para añadir usuario 
   const mutation = useMutation(
    async function (user) {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        body: JSON.stringify(user),
      });
      // throw new Error('Error !!!')
      // devuelve la respuesta convertida en json
      return response.json();
    },
    {
      //callbacks
      onMutate: () => console.log("La petición se va ha realizar"),
    },
    {
      onError: (Error) => console.log(Error),
    },
    {
      onSettle: () => console.log("Petición finalizada"),
    }, {
      //  propiedades react-query 
      retry: 3 //reintenta 3 veces la mutación. las mutaciones por defecto no hacen retry como useQuery
    }
  );

  // invocamos a la mutación mediante el método mutate
  function onSubmit() {
    mutation.mutate(
      {
        name: "Manu",
        email: "manuetov@hotmail.com",
      }, 
      // {
      //   //callbacks
      //   onSuccess: (json) =>
      //     console.log(
      //       json,
      //       "este es el json con el que se ha resuelto la promise"
      //     ),
      // }, 
      // {
      //    // invalida todas las queries de la petición get con la clave users
      //     onSuccess: (json) => queryClient.invalideQueries('users')
      //    // en el momento que se cree el usuario invalidará todos los usuarios de la api
      // },
      {
         onSuccess: (json) => queryClient.setQueryData("users", function(oldData){
            return {
               ...oldData,
               data: [
                  ...oldData.data,
                  {
                     name: "Manu",
                     email: "manuetov@hotmail.com",
                  }, 
                  // json
               ]
            }
         })
      }
    );
  }

  return (
    <>
      <h1> Form </h1>
      <button onClick={onSubmit}>Crear usuario</button>
      {/* propiedades */}
      {mutation.isLoading && <div>Creando uduario</div>}
      {mutation.isSuccess && <div>Usuario creado con exito</div>}
      {mutation.isError && <div>Se ha producido un error</div>}
      {mutation.isIdle && <div>todavía nada...</div>}
    </>
  );
}
