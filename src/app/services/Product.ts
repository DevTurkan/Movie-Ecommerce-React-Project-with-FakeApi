import axios from 'axios';
import { http } from './http';
// import {http} from './http';

// export interface ProductData{
//     id : number;
//     title : string;
//     color : string;
//     imgurl: string;
//     stock: number;
// }

// export interface ProductData{
//     id : number;
//     title : string;
//     price : number;
//     description: string;
//     category: string;
//     image: string;
//     rating: {
//         rate: number,
//         count: number,
//     };
// }

export interface ProductData{
    id: number;
    price: number;
    name: string;
    category: string;
    about: string;
    episodes: number;
    releasedate: number;
    country: string;
    genres: string[];
    image: string;
    topcast: string[];
    trailer: string;
}

export interface ShopProductData{
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}

export const getMovieProducts = async () : Promise<ProductData> => {
    const { data } = await http.get<ProductData>(`mediacenter`);
    return data;
};

export const getShopProducts = async () : Promise<ShopProductData> => {
    const { data } = await http.get<ShopProductData>(`productcenter`);
    return data;
};


//  export const getProducts = async() : Promise<ProductData> => {
//     const {data} = await axios.get<ProductData>(`http://localhost:3000/bags`);

    
//     return data;
// }

// axios
//             .get("http://localhost:3000/bags")
//             .then((res) => {
//                 setData(res.data);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });


// =============================================================================================


// export interface ProductData{
//     id: number;
//     image: string;
//     title: string;
// }













