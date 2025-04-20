import { queryOptions } from"@tanstack/react-query";

// import { Dispatch, SetStateAction } from 'react';

// تعریف نوع Props
export interface ID {
  id: number;
//   setText: Dispatch<SetStateAction<string>>;
}
export default function createUserQueryOptions(id:number){
    return queryOptions({
        queryKey: [id],
        queryFn:()=>getUser(id)
    })
}

const getUser = async(id:number):Promise<User>=>{
    await new Promise((resolve)=>setTimeout(resolve,1000))
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    return await response.json()

}
 type User ={
id: number
name: string
username: string
email: string
address: {
  street: string,
  suite:string,
  city: string,
  zipcode: string,
  geo: {
    lat:string
    lng:string
  }
},
phone:string
website: string
company: {
  name:string
  catchPhrase: string
  bs: string
}
}