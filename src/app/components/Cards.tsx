'use client'
import Loading from "@/components/common/Loading"
import createTodoQueryOptions from "@/queryOptions/createTodoQueryOptions"
import createUserQueryOptions from "@/queryOptions/createUserQueryOptions"
import { useQueries } from "@tanstack/react-query"
import { useState } from "react"


const Cards = () => {
  const [id, setId] = useState<number>(1)
  const [{ data: resultTodo, isPending: pend1 }, result2] = useQueries({
    queries: [
      createTodoQueryOptions(),
      createUserQueryOptions(id)
    ]
  })

  return (
    <div className='p-4 border-blue-500 border-2 relative'>
      <h1 className='text-blue-500 text-5xl mb-2'>کامنت ها</h1>
      {pend1 ? <Loading /> : <div className="card">
        {resultTodo?.map(comment => {
          return (
            <div className="card flex flex-col p-2 shadow-md my-2 border border-red-300" key={comment.id}>
              <div className="header flex flex-col gap-2">
                <div className="userName flex gap-2"><div className="icone"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
                </div>
                  <div className="name">{comment.name}</div></div>
                <div className="email">{comment.email}</div>
              </div>
              <div className="body border border-white p-2">{comment.body}</div>
            </div>
          )
        })}

      </div>}


      {result2.isPending ? <Loading /> : <div className="text-red-400">
        {JSON.stringify(result2?.data?.name)}
      </div>}

      <button className=" bottom-0 left-0 text-2xl border-2 px-2 py-1 border-green-400" onClick={() => setId((prev) => prev + 1)}>Increment ID</button>

    </div>
  )
}

export default Cards
