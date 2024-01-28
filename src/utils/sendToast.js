import { ToastContainer, toast } from 'react-toastify';

export function sendToast(toastType,toastmessage){
    switch (toastType) {
        case "error":
            toast.error(toastmessage, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            break;
        case "success":
            toast.success(toastmessage, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });  
            break;      
        default:
            toast(toastmessage, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            break;
    }
    
}
