import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate()
  return (
    <div>
      <img
      onClick={() => navigate("/")}
        className="cursor-pointer rounded-full"
        height="70"
        width="70"
        src="/sante.jpeg"
      />
    </div>
  );
}

export default Logo;