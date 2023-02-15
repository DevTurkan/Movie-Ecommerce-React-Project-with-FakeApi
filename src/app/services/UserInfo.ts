import axios from 'axios';
import { http } from './http';
import { ProductData, ShopProductData } from './Product';
// import {http} from './http';
export interface UserStateRdx{
    alluserslist:UserData[];
    selecteduser:UserData;
};

export interface UserData{
    id: number;
    userName: string;
    email: string;
    password: string;
    watchlist:ProductData[];
    card:ProductData[] | ShopProductData[];
    wishlist: ShopProductData[];
    // userimage?: string;
};

export const postAllUsers = async (newuser: UserData) => {
    const { data } = await http.post<UserData>(
        `users`,
        newuser,        

    );
    return data;
};
        export const postAllllUsers = async (newuser: UserData) => {
            const { data } = await http.post<UserData>(
                `users`,
                newuser,        

            );
            return data;
        };

        // export const postAllllUsers = async(newuserr) => {
        //     const {data} = await axios.post(`http://localhost:3000/users`, newuserr);
        
            
        //     return data;
        // }

        // export const postAllllUsers = async (newuser) => {
        //     const {data} = await axios({
        //      'post',
        //       'http://localhost:3000/users',
        //          newuser
        //     });
        //     return data;
        
        // };

export const putAllUsers = async (newuser: UserData, post_id:number) => {
    const { data } = await http.put<UserData>(
        `users/${post_id}`,
        newuser,        

    );
    return data;
};

            export const putFormdataAllUsers = async (newuser: UserData, post_id:number) => {
                const { data } = await http.put<UserData>(
                    `users/${post_id}`,
                    newuser,        

                );
                return data;
            };

export const getAllUsers = async () : Promise<UserData> => {
    const { data } = await http.get<UserData>(`users`);
    return data;
};

export const deleteUsers = async (post_id:number) => {
    const { data } = await http.delete<UserData>(
        `users/${post_id}`,       

    );
    return data;
};

export const postSelectedUsers = async (selectuser: UserData) => {
    const { data } = await http.post<UserData>(
        `selectedusers`,
        selectuser,        

    );
    return data;
};

export const deleteSelectedUsers = async (post_id:number) => {
    const { data } = await http.delete<UserData>(
        `selectedusers/${post_id}`,       

    );
    return data;
};

export const getSelectedUsers = async () : Promise<UserData> => {
    const { data } = await http.get<UserData>(`selectedusers`);
    return data;
};

export const putSelectedUsers = async (newuser: UserData, post_id:number) => {
    const { data } = await http.put<UserData>(
        `selectedusers/${post_id}`,
        newuser,        

    );
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













