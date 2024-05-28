import NavBar from "../components/navBar";
import Footer from "../components/footer";
import PageComponent from "../components/pageComponent";
import axios from "axios";
import { useEffect, useState } from "react";

const PhonePage = () => {
    const [phones, setPhones] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/items/phone')
            .then((response) => {
                setPhones(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <NavBar />

            <div className="bg-[#282828] min-h-screen">
                <PageComponent title={phones} items={phones} />
            </div>

            <Footer />
        </>
    );
}

export default PhonePage;