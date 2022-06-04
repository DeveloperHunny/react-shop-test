import React, {ChangeEvent, FC} from "react";

const Options:FC<{name : string, updateItemCount : (name : string, newItemCount:string) => void}> = ({name,updateItemCount}) => {

    const handleChange = (checked : boolean) => {
        updateItemCount(name, checked === true ? "1" : "0");
    }

    return(
        <form>
            <input type="checkbox" id={`${name} options`} onChange={(e) => handleChange(e.target.checked)}/>
            <label htmlFor={`${name} options`}>{name}</label>
        </form>
    )
}
export default Options;
