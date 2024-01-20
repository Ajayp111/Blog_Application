import cse from "../../public/Logo.png";

const LoginHeader = () => {
  return (
    <>
      <div className="container-fluid p-0 position-relative">
        <img
          src={cse}
          className="w-100 cse img-fluid banner-image grayscale-image"
          style={{
            height: "300px",
            objectFit: "cover",
            maxWidth: "100%",
            width: "100%",
          }}
          alt="cse"
        />
      </div>
    </>
  );
};

export default LoginHeader;
