import "./Loading.css"
import { BarWave, CircularProgress, FlippingSquare } from "react-cssfx-loading";

function Loading() 
{
    return (
        <div className="loading-container">
            <CircularProgress color="white" width="80px" height="80px" duration="3s"/>
        </div>
    );
}

export default Loading;