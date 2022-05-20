import { useQuery } from 'react-query'

// import usuarios from './usuarios.json'
// console.log(usuarios);

export default function Users() {
   const queryUser= useQuery('users', async function () {
      const response = await fetch('https://reqres.in/api/users?page=2')
      console.log(response)
      // const response1 = await fetch(usuarios)
      return response.json()
   })

   if (queryUser.isError) {
      return <div> Error </div>
   }

   if (queryUser.isLoading) {
      return <div> Cargando...</div>
   }


   return (
      <ul>
         {queryUser.data.data.map((user) => (
            <li key={user.id}> {user.email} </li>
         ))}
      </ul>
   )



}
