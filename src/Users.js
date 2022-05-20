import { useQuery } from 'react-query'

// import usuarios from './usuarios.json'
// console.log(usuarios);

export default function Users() {
   const queryUser= useQuery('users', async function () {
      const response = await fetch('https://reqres.in/api/users')
      console.log(response)
      return response.json()
   })

   if (queryUser.isError) {
      return <div> Error </div>
   }

   if (queryUser.isLoading) {
      return <div> Cargando...</div>
   }

   console.log('Renderizando api reqres')
   console.log(queryUser.isFetching) 

   return (
      <ul>
         {queryUser.data.data.map((user) => (
            <li key={user.id}> {user.email} </li>
         ))}
      </ul>
   )



}
