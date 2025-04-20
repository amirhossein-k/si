// lib/api/products.ts
// 'use server'
// export async function getProducts() {
//     const res = await fetch('/api/products/list',{method:'GET',headers: {
//       'Content-Type': 'application/json',
// }});
//     if (!res.ok) throw new Error('Failed to fetch products');
//     return res.json();
//   }
interface User {
  id        :string
  email     :string
  name     :string
  posts   :  Post[]
  createdAt :string
}
interface Post {
  id     :  string
  content? :string
  published :boolean
  price:string
  author :User
  authorId :string
  createdAt :string
updatedAt:string
}
export async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res   = await fetch(`${baseUrl}/api/products/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // برای جلوگیری از کش شدن
    });
    // console.log(res.json(),'mmmmmmmm')
    
    if (!res.ok) throw new Error('خطا در دریافت محصولات');
    return  res.json() ;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}