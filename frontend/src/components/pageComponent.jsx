import Item from "./item";

const PageComponent = ({ title, items}) => {
    return (
        <>
            <div className="pt-16 text-white flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold my-4">Sản phẩm</h1>
                <div className="grid grid-cols-5 gap-4">
                    {items.map((item, index) => (
                        console.log(item),
                        <Item
                            id={item[0]}
                            key={item[0]}
                            img={item[2]}
                            name={item[1]}
                            price={item[3]}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default PageComponent;