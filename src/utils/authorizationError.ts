import { toast } from "react-toastify";

export const showAuthorizationErrorElseDefaultError = (error: any) => {
    if (error?.response?.data?.code === 401) {
        toast.info("PLEASE LOGIN TO CONTINUE");
    }
    else {
        const errorMessage = error?.response?.data?.message || "An error occurred. Please try again later.";
        toast.error(errorMessage);
    }
}