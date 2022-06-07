import {createContext, FC, ReactElement, useEffect, useMemo, useState} from "react";

interface IState{
    orderDatas : {
        orderCounts : orderCountState,
        totals : {products : number, options : number, total : number}
    }
    updateItemCount : (itemName : string, newItemCount : string, orderType : OrderKeyType) => void;
}

const InitialState : IState = {
    orderDatas : {
        orderCounts : {products : new Map<string,number>(), options : new Map<string,number>()},
        totals : {products : 0, options : 0, total : 0}
    },
    updateItemCount : (itemName : string, newItemCount : string, orderType : OrderKeyType) => {},
}

export const OrderContext = createContext<IState>(InitialState);

export type OrderKeyType = "products" | "options"

const pricePerItem ={
    products : 1000,
    options : 500,
}

interface orderCountState{
    products : Map<string,number>;
    options : Map<string,number>;
}

function calculateSubtotal(orderType : OrderKeyType, orderCounts : orderCountState){
    let optionCount = 0;
    // @ts-ignore
    for(const count of orderCounts[orderType].values()){
        optionCount += count;
    }

    return optionCount * pricePerItem[orderType];
}



export const OrderContextProvider:FC<{children : ReactElement}> = ({children}) => {
    const [orderCounts, setOrderCounts] = useState<orderCountState>({
        products: new Map(),
        options : new Map(),
    });

    const [totals, setTotals] = useState({
        products : 0,
        options : 0,
        total : 0,
    });


    0
    useEffect(() => {
        const productsTotal = calculateSubtotal('products', orderCounts);
        const optionsTotal = calculateSubtotal('options', orderCounts);
        const total = productsTotal + optionsTotal;

        setTotals({
            products: productsTotal,
            options: optionsTotal,
            total: total,
        })

    }, [orderCounts]);

    const value = useMemo(() => {
        const updateItemCount = (itemName : string, newItemCount : string, orderType : OrderKeyType) => {
            console.log("Update item count");
            const orderCountsTemp = {...orderCounts};
            const orderCountsMap = orderCountsTemp[orderType];
            orderCountsMap.set(itemName, parseInt(newItemCount));
            setOrderCounts({...orderCountsTemp});
        }
        return { orderDatas : {orderCounts, totals} , updateItemCount}
    }, [orderCounts, totals]);

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}
