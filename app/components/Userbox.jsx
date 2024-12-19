import {
    FaDribbbleSquare,
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
    FaTwitterSquare,
} from "react-icons/fa";
const Userbox = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl p-5 sticky top-14 ">
      <figure>
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title ">Self-discipline is key in life.</h2>
        <div className="flex justify-between md-w-[75%] gap-1">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaDribbbleSquare size={30} />
        </div>
          <div className="stats shadow">
            <div className="stat ">
              <div className="stat-title">Category</div>
              <div className="stat-value text-xl">33</div>
            </div>
            <div className="stat ">
              <div className="stat-title">Archive</div>
              <div className="stat-value text-xl">18</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Userbox;
