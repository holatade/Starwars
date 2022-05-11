import React from "react";
import "./loader.styles.scss"

const Loader = ({loading}) => {
    if(loading){
        return (
            <div className="loader">
                <div className="spinner-border text-warning " role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p>Loading...</p>
            </div>
        )        
    }    
}

export default Loader;