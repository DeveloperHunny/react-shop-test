import React from "react";
import {FC} from "react";

const ErrorBanner:FC<{message : string}> = ({ message }) => {
    let errorMessage  = message || "에러업니다.";

    return(
        <div data-testid="error-banner"
            style={{backgroundColor:"red", color:"white"}}
        >
            {errorMessage}
        </div>
    )
}

export default ErrorBanner
