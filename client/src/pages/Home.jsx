import RowOfProduct from "../features/product/RowOfProduct";
import Banner1 from "../ui/Banner1";
import Category from "../ui/Category";
import Hero from "../ui/Hero";
import NewArrive from "../ui/NewArrive";
import Services from "../ui/Services";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <RowOfProduct status="Flash Sales">
        <RowOfProduct.Title subTitle="Today’s" title="Flash Sales" />
        <RowOfProduct.Data />
      </RowOfProduct>
      <Category />
      <RowOfProduct status="Best Selers">
        <RowOfProduct.Title
          title="Best Selling Products"
          subTitle="This Month"
        />
        <RowOfProduct.Data />
      </RowOfProduct>
      <Banner1 />
      <RowOfProduct status="Our Products">
        <RowOfProduct.Title
          title="Explore Our Products"
          subTitle="Our Products"
        />
        <RowOfProduct.Data />
      </RowOfProduct>
      <NewArrive />
      <Services /> */}
    </div>
  );
};

export default Home;
