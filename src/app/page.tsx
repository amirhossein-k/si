"use server";

import FitstItem from "@/components/fitst/FitstItem";
import Layout from "@/components/layout/Layout";
import { CATEGORYLayout } from "@/utils/types";
import SliderComponent from "@/components/slider/slider";
import GIfHome from "@/components/GIfHome/GIfHome";
import NewProduct from "@/components/newproduct/NewProduct";
import LayoutFirst from "@/components/layout/LayoutFirst";
import OfferProduct from "@/components/offerProduct/OfferProduct";
import SpinnersNav from "@/components/products/SpinnerNav";
import Footer from "./components/footer/Footer";

const categoryLayout: CATEGORYLayout[] = [
  {
    id: '',
    layout: "item1",
    item: [
      {
        id: '1',
        link: '/products/list',
        pic: 'https://c961427.parspack.net/c961427/uploads/banner-10.jpg',
        title: 'قاب ها'
      },
      {
        id: '4',
        link: '/qhab',
        pic: 'https://c961427.parspack.net/c961427/uploads/banner-11.jpg',
        title: 'قاب ها'
      },
      {
        id: '2',
        link: '/kif',
        pic: 'https://c961427.parspack.net/c961427/uploads/banner-12.jpg',
        title: 'کیف ها'
      },
      {
        id: '3',
        link: '/ecsessory',
        pic: 'https://c961427.parspack.net/c961427/uploads/banner-13.jpg',
        title: 'اکسسوری'
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
    layout: "newproduct",
    id: "QdcHTH4d4R2J9",
    item: [
      {
        id: 'dcdcdw1',
        link: '/qhab',
        pic: 'https://c961427.parspack.net/c961427/uploads/1741707921428-photo_2_2025-01-25_21-12-24.jpg',
        title: 'قاب ها'
      },
      {
        id: '2dcdc',
        link: '/kif',
        pic: 'https://c961427.parspack.net/c961427/uploads/1741707921428-photo_2_2025-01-25_21-12-24.jpg',
        title: 'کیف ها'
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
  {
    layout: "offerproduct",
    id: "QdcHTH4d4feR2J9",
    item: [
      {
        id: 'dcdfefcdw1',
        link: '/qhab',
        pic: 'https://c961427.parspack.net/c961427/uploads/fpb-1.jpg',
        title: '5قاب ها',
        count: '21/03/2025/23',
      },
      {
        id: '2dcdfefc',
        link: '/kif',
        pic: 'https://c961427.parspack.net/c961427/uploads/fpb-2.jpg',
        title: '6 ها',
        count: '21/03/2025/22',

      },
      {
        id: 'dcdfefcdw1',
        link: '/qhab',
        pic: 'https://c961427.parspack.net/c961427/uploads/fpb-1.jpg',
        title: '5قاب ها',
        count: '22/03/2025/22',

      },
      {
        id: '2dcdfefc',
        link: '/kif',
        pic: 'https://c961427.parspack.net/c961427/uploads/fpb-2.jpg',
        title: '4 ها',
        count: '23/03/2025/22'
      },
      {
        id: 'dcdfefcdw1',
        link: '/qhab',
        pic: 'https://c961427.parspack.net/c961427/uploads/fpb-1.jpg',
        title: '3قاب ها',
        count: '24/03/2025/22',

      },
      {
        id: '2dcdfefc',
        link: '/kif',
        pic: 'https://c961427.parspack.net/c961427/uploads/fpb-2.jpg',
        title: 'کfیف ها',
        count: '22/03/2025/08',

      },
      {
        id: 'dcdfefcdw1',
        link: '/qhab',
        pic: 'https://c961427.parspack.net/c961427/uploads/fpb-1.jpg',
        title: '2قاب ها',
        count: '22/03/2025/10',

      },
      {
        id: '2dcdfefc',
        link: '/kif',
        pic: 'https://c961427.parspack.net/c961427/uploads/fpb-2.jpg',
        title: 'fffff',
        count: '25/03/2025/22',

      },
    ]
  },
];

export default async function Home() {
  return (
    <div className="">
             <SpinnersNav/>

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
        item.layout === "newproduct" ? (
          <Layout size={"offer"} key={item.id}>
            <NewProduct category={item.item || []} />
          </Layout>
        ) : item.layout === "gifhome" ? (
          <Layout size={"newproduct"} key={item.id}>
            <GIfHome category={item.item || []} />
          </Layout>
        ) : item.layout === "offerproduct" ? (
          <Layout size={"offer"} key={item.id}>
            <OfferProduct category={item.item || []} />
          </Layout>
        ) : (
          <div className='hidden' key={item.id}>ddd</div>
        )
      )}
      <Footer/>
    </div>
  );
}
