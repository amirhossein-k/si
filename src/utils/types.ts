export interface USERTYPE {
    id        :string
    email     :string
    password : string |null
    name     :string|null
    posts   :  POSTTYPE[]
    createdAt :Date
    isVerfied: boolean;
    listordershop: string[];
    address: ADRESS[];
    admin:   boolean

  }
 export interface PHOTO {
    id:string
    defaultImage:boolean
    childImage:string
    fileKey:string |null
    ownerId:string | null
    
  
  }
   export interface POSTTYPE {
    quantity? : string
    id     :  string
    content? :string | null
    title:string
    published :boolean
    price:number
    count :number
    countproduct : number
    priceOffer : number
    author? :USERTYPE
    authorId :string
    createdAt :Date
    updatedAt:Date
    productImage: PHOTO[]
    categoryList: Category[]
    review: Review[]
    tags: string[]
    tableContent:string | null
  }
  export interface Review{
    reviewText: string
    name     :  string
    email    :  string
    createdAt : Date 
  }

  export interface Category{
    id: string
    category :string
  }

 export interface ADRESS {
    location: string;
    state: string;
    zipcode: string;
    id: string
    userId:string
  }


export interface CATEGORYLayout{
  id:string
  item?:CATEGORYLayoutITEM[]
  layout:string
  item2?:CATEGORYLayoutITEM[]

}

export interface CATEGORYLayoutITEM{
  id:string
  link:string
  pic:string
  title:string
  subtitle?:string
  count?:string

}
  