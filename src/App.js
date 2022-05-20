import { QueryClient, QueryClientProvider } from 'react-query'
import Users from './Users'

const queryClient = new QueryClient()

export default function App(){
   return (
      <QueryClientProvider client={queryClient}>
         <div className="App">
            <h1> practica react-query</h1>
            <Users />
         </div>

      </QueryClientProvider>
   )
}
