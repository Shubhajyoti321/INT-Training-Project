import ErrorStackParser from 'error-stack-parser';
import StackTraceGPS from 'stacktrace-gps';
import { isMobile } from 'react-device-detect';

import { sendErrorMail } from '../error-tracking/index';

const errorHandler = (error) => {

    const successCallback = (errorData) => {

        const newErrorData = {
            ...errorData,
            isMobile,
            errorMessage: error.message
        }
        
        const postData = {
            "errors"     : JSON.stringify(newErrorData),
        }
        
        sendErrorMail(postData)
        .then((res)=> {
            console.log("Error Has Been Logged.");
        })
        .catch((error)=>{
            console.log("Error while logging!",error);
        })
    }

    const errorCallback = (error) => {
        console.log("Failed to log error!",error);
    }

    const stackframe = ErrorStackParser.parse(error);
    var gps = new StackTraceGPS();
    gps.pinpoint(stackframe[0]).then(successCallback, errorCallback);
    
}
 
export default errorHandler;