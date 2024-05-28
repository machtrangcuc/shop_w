import NavBar from "../components/navBar";
import Footer from "../components/footer";
import PageComponent from "../components/pageComponent";
import axios from "axios";
import { useEffect, useState } from "react";

const LaptopPage = () => {
    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/items/laptop')
            .then((response) => {
                setLaptops(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <NavBar />

            <div className="bg-[#282828] min-h-screen">
                <PageComponent title={laptops} items={laptops} />
            </div>

            <Footer />
        </>
    );
}

export default LaptopPage;