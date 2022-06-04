import React, {ChangeEvent, FC} from 'react';

const Products:FC<{name:string, imagePath:string, updateItemCount: (itemName:string, newItemCount:string) => any}> = ({name ,imagePath, updateItemCount}) => {

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
                    onChange={(e) => updateItemCount(name, e.target.value)}/>
            </form>
        </div>

    );
}

export default Products;
