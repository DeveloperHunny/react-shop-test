import React, {FC, ReactNode, useState} from 'react';
import {useEffect} from 'react';
import axios from "axios";
import Products from "./Products";
import ErrorBanner from "../CompletePage/ErrorBanner";

interface itemType{
    name:string,
    imagePath:string,
}


const Type:FC<{orderType : string}> = ({orderType}) => {
    const [items, setItems] = useState<itemType[]>([]);
    const [error, setError] = useState(false);


    useEffect(() => {
        loadItems(orderType);

    },[orderType])

    const loadItems = async (orderType : string) => {
        try{
            let response = await axios.get(`http://localhost:5000/${orderType}`);
            setItems(response.data);
        }catch (error){
            console.log("에러가 발생했습니다.")
            setError(true);
        }
    };

    if(error){
        return <ErrorBanner message="에러가 발생했습니다."/>
    }


    const ItemComponents:FC<{name : string, imagePath:string}> = ({ name, imagePath}) => {
        return(
            orderType === "products" ?
                <Products key={name} name={name} imagePath={imagePath}/> : null
        );
    }

    const optionItems = items.map((item) => {
        return(
            <ItemComponents
                key = {item.name}
                name={item.name}
                imagePath={item.imagePath}/>
        );


    })



    return(
        <div>
            {optionItems as ReactNode}
            {/*{items.map((item) => {*/}
            {/*    return(*/}
            {/*        <Products name={item.name} imagePath={item.imagePath}/>*/}
            {/*    );*/}
            {/*})}*/}
        </div>
    )
}



export default Type;
