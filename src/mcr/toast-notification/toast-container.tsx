import { format } from "date-and-time";

export default function ToastContainer() {
    // => Wed, Jul 09 2025
    const date = format(new Date(), "ddd, MMM DD YYYY");
    // const date = "21-03-2000";
    return <div className="font-bold">Hello World : {date}</div>;
}
