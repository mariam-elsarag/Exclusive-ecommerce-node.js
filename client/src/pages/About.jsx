import RowOfLinks from "../ui/RowOfLinks";
import Banner from "../ui/Banner";
import Number from "../ui/Number";
import Team from "../ui/Taem";
import Services from "../ui/Services";
const About = () => {
  return (
    <>
      <RowOfLinks currentPage="about" />
      <Banner />
      <Number />
      <Team />
      <Services />
    </>
  );
};

export default About;
