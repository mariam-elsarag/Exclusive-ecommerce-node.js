import { team1, team2, team3 } from "../assets/image";
import { CiTwitter, CiInstagram, RiLinkedinLine } from "../icon";
const team = [
  { id: 0, image: team1, name: "Tom Cruise", title: "Founder & Chairman" },
  { id: 1, image: team2, name: "Emma Watson", title: "Managing Director" },
  { id: 2, image: team3, name: "Will Smith", title: "Product Designer" },
];
const Taem = () => {
  return (
    <div className="Container grid grid-cols-1 gap-14  sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 ">
      {team.map((item) => (
        <div key={item.id} className="flex flex-col ">
          <figure className="flex h-[430px] flex-col items-center justify-end bg-[#F5F5F5]   pt-10">
            <img src={item.image} alt={item.name} />
          </figure>
          <div className="mt-8 text-center sm:text-start">
            <h3 className="mb-2 font-header text-3xl">{item.name}</h3>
            <small>{item.title}</small>
            <div className="mt-4 flex items-center justify-center gap-2 sm:justify-start">
              <CiTwitter size={22} />
              <CiInstagram size={22} />
              <RiLinkedinLine size={22} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Taem;
