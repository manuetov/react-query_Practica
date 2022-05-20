import { useMutation } from 'react-query'

export default function Form() {
   const mutation = useMutation(async function(user) {
      const response = await fetch('https://reqres.in/api/users', { 
         method: 'POST',
         body: JSON.stringify(user)
      })
      return response.json()
   })

   // invocamos a la mutación mediante el método mutate
   function onSubmit() {
      mutation.mutate({
         name: "Manu",
         email: "manuetov@hotmail.com"
      })
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
