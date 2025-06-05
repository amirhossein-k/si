// src\app\page.tsx
"use server";

import FitstItem from "@/components/fitst/FitstItem";
import Layout from "@/components/layout/Layout";
import { CATEGORYLayout ,FormattedPostType} from "@/utils/types";
import SliderComponent from "@/components/slider/slider";
import GIfHome from "@/components/GIfHome/GIfHome";
import NewProduct from "@/components/newproduct/NewProduct";
import LayoutFirst from "@/components/layout/LayoutFirst";
import OfferProduct from "@/components/offerProduct/OfferProduct";
import SpinnersNav from "@/components/products/SpinnerNav";
import Footer from "./components/footer/Footer";
import { GetNewProducts, GetProductOffer } from "../../actions/GetProductList";
import CommentVisit from "@/components/commentvisitor/CommentVisit";


const categoryLayout: CATEGORYLayout[] = [
  {
    id: '',
    layout: "item1",
    item: [
      {
        id: '1',
        link: '/products/list?category=qhab&sort=new&minPrice=0&maxPrice=5000000&count=1',
        pic: 'https://c961427.parspack.net/c961427/uploads/banner-10.jpg',
        title: 'قاب ها'
      },
      {
        id: '4',
        link: '/products/list?category=lavazemKhaneqhab&sort=new&minPrice=0&maxPrice=5000000&count=1',
        pic: 'https://c713657.parspack.net/c713657/uploads/banner-12%20%281%29%20copyaaaa.jpg',
        title: ' لوازم خانه'
      },
      {
        id: '2',
        link: '/products/list?category=dekori&sort=new&minPrice=0&maxPrice=5000000&count=1',
        pic: 'https://c961427.parspack.net/c961427/uploads/banner-12.jpg',
        title: 'لوازم دکوری '
      },
      {
        id: '3',
        link: '/products/list?category=mobile&sort=new&minPrice=0&maxPrice=5000000&count=1',
        pic: 'https://c961427.parspack.net/c961427/uploads/banner-11.jpg',
        title: 'موبایل'
      },
    ],
  },
  {
    id: 'sdsds',
    layout: "slider",
    item: [
      {
        id: '1',
        link: '/qhab',
        pic: 'https://c961427.parspack.net/c961427/uploads/2.jpg',
        title: 'قاب ها'
      },
      {
        id: '2',
        link: '/kif',
        pic: 'https://c961427.parspack.net/c961427/uploads/02-slide-1.jpg',
        title: 'تا 20% تخفیف',
        subtitle: ' گلکسی باد سامسونگ ',
      },
      {
        id: '3',
        link: '/ecsessory',
        pic: 'https://c961427.parspack.net/c961427/uploads/02-slide-2.jpg',
        title: 'هدست بازی',
        subtitle: 'هدست 40% تخفیف برای محصولات و ارسال رایگان',
      },
    ]
  },
  
  {
    layout: "gifhome",
    id: "QHTH4d4R2J9",
    item: [
      {
        id: '1',
        link: '/qhab',
        pic: 'https://c961427.parspack.net/c961427/uploads/frr.gif',
        title: 'قاب ها'
      },
      {
        id: '2',
        link: '/kif',
        pic: 'https://c961427.parspack.net/c961427/uploads/gif2.gif',
        title: 'کیف ها'
      },
    ]
  },
  
  
];

export default async function Home() {

// گرفتن محصولات تخفیف‌دار
  const offerList = await GetProductOffer();
  if ('error' in offerList) {
    return (
      <div className="text-red-500 text-center p-4">
        خطا در بارگذاری محصولات تخفیف‌دار: {offerList.error}
      </div>
    );
  }
  // محصولات جدید
  const newList = await GetNewProducts()
  if('error' in newList){
    return(
      <div className="text-red-500 text-center p-4">
        خطا در بارگذاری محصولات جدید : {newList.error}

      </div>
    )
  }

  const productsOffer : FormattedPostType[] = offerList
  const newProducts : FormattedPostType[] = newList


  return (
    <div className="">
             <SpinnersNav/>
<CommentVisit/>
      <LayoutFirst size="first">
        <>
          {categoryLayout
            .filter(filter => filter.layout === 'slider' || filter.layout === 'item1')
            .map((item: CATEGORYLayout) =>
              item.layout === 'item1' ? (
                <FitstItem category={item.item || []} key={item.id} />
              ) : (
                <SliderComponent category={item.item || []} key={item.id} />
              )
            )}
        </>
      </LayoutFirst>

      {categoryLayout.map((item: CATEGORYLayout) =>
        item.layout === "gifhome" ? (
          <Layout size={"newproduct"} key={item.id}>
            <GIfHome category={item.item || []} />
          </Layout>
        )  : (
          <div className='hidden' key={item.id}>ddd</div>
        )
      )}
      <Layout size={'offer'} >
        <OfferProduct category={productsOffer || []}/>
      </Layout>
      <Layout size={'offer'} >
        <NewProduct category={newProducts || []}/>
      </Layout>
        
      
    
      <Footer/>
    </div>
  );
}
