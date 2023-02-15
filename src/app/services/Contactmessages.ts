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

export interface ContactData{
    id: number;
    firstname: string;
    lastname: string;
    mail: string;
    messages: string;
}


// export const getContact = async () : Promise<ContactData> => {
//     const { data } = await http.get<ContactData>(`contactinfo`);
//     return data;
// };

export const postContact = async (msg: ContactData) => {
    const { data } = await http.post<ContactData>(
        `contactinfo`,
        msg,        

    );
    return data;
};




// {   id: 4,
//     firstname: "4f",
//     lastname: "4l",
//     mail: "4m",
//     messages: "4msg"
// }








// export const getContact = async () : Promise<ContactData> => {
//     const { data } = await http.post<ContactData>(`contactinfo`, body: JSON.stringify(post_data));
//     return data;
// };

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













