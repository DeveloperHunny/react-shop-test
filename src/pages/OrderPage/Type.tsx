import React, {FC, ReactElement, ReactNode, useContext, useState} from 'react';
import {useEffect} from 'react';
import axios from "axios";
import Products from "./Products";
import ErrorBanner from "../CompletePage/ErrorBanner";
import Options from "./Options";
import {OrderContext, OrderKeyType} from "../../contexts/OrderContext";

interface itemType{
    name:string,
    imagePath:string,
}


const Type:FC<{orderType : string}> = ({orderType}) => {
    const [items, setItems] = useState<itemType[]>([]);
    const [error, setError] = useState(false);
    const {orderDatas , updateItemCount} = useContext(OrderContext);


    useEffect(() => {
        loadItems(orderType);

    },[orderType])

    const loadItems = async (orderType : string) => {
        try{
            let response = await axios.get(`http://localhost:5000/${orderType}`);
            setItems(response.data);
        }catch (error){
            setError(true);
        }
    };

    if(error){
        return <ErrorBanner message="에러가 발생했습니다."/>
    }


    const ItemComponents:FC<{name : string, imagePath : string, updateItemCount:(itemName:string, newItemCount:string) => void}>
        = ({name, imagePath, updateItemCount}) => {
        return orderType === "products" ? <Products name={name} imagePath={imagePath} updateItemCount={updateItemCount}/>
            : <Options name={name} updateItemCount={updateItemCount}/> ;
    }

    const optionItems = items.map((item) => {
        return(
            <ItemComponents
                key = {item.name}
                name={item.name}
                imagePath={item.imagePath}
                updateItemCount = {(itemName : string, newItemCount : string) => updateItemCount(itemName,newItemCount,orderType as OrderKeyType)}/>
        );
    });



    return(
        <>
            <h2>주문 종류</h2>
            <p>하나의 가격</p>
            <p>총 가격 : {orderDatas.totals[orderType as OrderKeyType]}</p>
            <div style={{ display:'flex', flexDirection: orderType === "options" ? 'column' : 'row'}}>
                {optionItems}
            </div>
        </>
    )
}



export default Type;
