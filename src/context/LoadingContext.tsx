//context\LoadingContext.tsx

'use client'

import { createContext,useContext,useState } from "react"

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isLoadingNavId: boolean;
  setIsLoadingNavId: (isLoading: boolean) => void;
  isLoadingFilter: boolean;
  setIsLoadingFilter: (isLoading: boolean) => void;

}
const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export  const LoadingProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNavId,setIsLoadingNavId] =useState(false)
  const [isLoadingFilter,setIsLoadingFilter] =useState(false)

  return(
    <LoadingContext.Provider value={{isLoadingFilter,setIsLoadingFilter,isLoading,setIsLoading,isLoadingNavId,setIsLoadingNavId}}>
      {children}
    </LoadingContext.Provider>  
  )
}

export const useLoading = ()=>{
    const context = useContext(LoadingContext)
    if(!context){
        throw new Error('useLoading must be used within a LoadingProvider')
    }
    return context
}