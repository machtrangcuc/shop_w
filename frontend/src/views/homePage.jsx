import Footer from "../components/footer.jsx";
import Navbar from "../components/navBar.jsx";
import Item from "../components/item.jsx";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/items/popular')
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Navbar />

            <div className="pt-16 bg-[#282828]">
                <div className="w-full h-fit flex justify-center">
                    <Carousel showThumbs={false} width={'900px'} autoPlay={true} infiniteLoop={true} interval={2000}>
                        <div>
                            <img src="https://i.pinimg.com/originals/d3/30/3e/d3303ee4a207bda571474988521d81a6.png" />
                        </div>
                        <div>
                            <img src="https://storage.pixteller.com/designs/designs-images/2020-12-21/05/laptop-new-arrival-sales-banner-1-5fe0c47813869.png" />
                        </div>
                        <div>
                            <img src="https://i.ytimg.com/vi/pQIbnkOuNoE/maxresdefault.jpg" />
                        </div>
                    </Carousel>
                </div>

                <div className="text-white mt-4 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-semibold my-4">Những sản phẩm nổi bật</h1>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            items.map((item) => {
                                return (
                                    <Item
                                        id={item[0]}
                                        key={item[0]}
                                        img={item[2]}
                                        name={item[1]}
                                        price={item[3]}
                                    />
                                )
                                }
                            )
                        }
                    </div>
                </div>
            </div>


            <Footer />
        </>
    );
}

export default HomePage;