import cse from "../../public/banner222.webp";

const Header = () => {
  return (
    <div className="container-fluid p-0 position-relative mt-8">
      <img
        src={cse}
        className="w-full cse img-fluid banner-image grayscale-image"
        style={{
          objectFit: "fit",
          maxHeight: "350px",
        }}
        alt="cse"
      />

      <div className="position-absolute top-0 end-0 p-3 d-md-none"></div>
      <div className="cse-content" style={{ fontSize: "1.5rem" }}></div>
    </div>
  );
};

export default Header;
