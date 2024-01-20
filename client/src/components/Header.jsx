import cse from "../../public/banner000.jpg";

const Header = () => {
  return (
    <>
      <div className="container-fluid p-0 position-relative">
        <img
          src={cse}
          className="w-full cse img-fluid banner-image grayscale-image"
          style={{
            objectFit: "fit",
            maxHeight: "400px", // Set a maximum height for the image
          }}
          alt="cse"
        />

        <div className="position-absolute top-0 end-0 p-3 d-md-none"></div>
        <div className="cse-content" style={{ fontSize: "1.5rem" }}></div>
      </div>
    </>
  );
};

export default Header;
