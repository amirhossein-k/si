import { queryOptions } from "@tanstack/react-query";

export default function createTodoQueryOptions(){
    return queryOptions({
        queryKey: [`todos`],
        queryFn: getTodos, 
      
      })
}
const getTodos = async():Promise<Todo[]> =>{
    await new Promise((resolve)=> setTimeout(resolve,1000))
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${1}`)
    return await response.json()
  }
  
  type Todo ={
    postId : number
    id: number
    name:string
    email: string
    body:string
  }