import NavBar from "../components/navBar";
import Footer from "../components/footer";
import PageComponent from "../components/pageComponent";
import axios from "axios";
import { useEffect, useState } from "react";

const OtherPage = () => {
    const [others, setOthers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/items/other')
            .then((response) => {
                setOthers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <NavBar />

            <div className="bg-[#282828] min-h-screen">
                <PageComponent title={others} items={others} />
            </div>

            <Footer />
        </>
    );
}

export default OtherPage;