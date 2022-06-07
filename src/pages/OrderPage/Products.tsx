import React, {ChangeEvent, FC, useCallback, useState} from 'react';

const Products:FC<{name:string, imagePath:string, updateItemCount: (itemName:string, newItemCount:string) => void}> = ({name ,imagePath, updateItemCount}) => {

    const [value, setValue] = useState("0");

    const handleOnChange = useCallback((e : ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        updateItemCount(name,value);
    },[]);

    return(
        <div style={{textAlign:"center"}}>
            <img
                style={{width:'75%'}}
                src={`http://localhost:5000/${imagePath}`}
                alt={`${name} product`}/>

            <form style={{marginTop:'10px'}}>
                <label style={{textAlign:'right'}}>{name}</label>
                <input
                    style={{marginLeft:7}}
                    type="number"
                    name="quantitiy"
                    min="0"
                    defaultValue='0'
                    value={value}
                    onChange={handleOnChange}/>
            </form>
        </div>

    );
}

export default Products;
