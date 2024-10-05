import { aboutHero } from "../assets/image";
const Banner = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-8 md:flex-nowrap">
        <div className="lg-w-full order-2    px-5 md:order-1 md:w-1/2 md:pl-5 lg:pl-8 xl:pl-24">
          <h2 className="mb-10 font-header text-5xl font-semibold">
            Our Story
          </h2>
          <p className="mb-6 text-base font-normal">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="text-base font-normal">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <figure className="order-1 flex justify-end px-5 md:order-2 md:w-1/2 md:px-0 ">
          <img src={aboutHero} alt="about" className="xl:max-h-[500px] " />
        </figure>
      </div>
    </>
  );
};

export default Banner;
