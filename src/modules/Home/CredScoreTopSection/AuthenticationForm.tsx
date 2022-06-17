//TODO: remove this component once we are out of testing phrase (this is just for testing experience in prod.)
import { useState } from "react";
import toast from "react-hot-toast";

const AuthenticationForm = ({ setIsAuthorized }) => {
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if secret key matches or env variable
    if (secretKey === process.env.NEXT_PUBLIC_SECRET_KEY) {
      setIsAuthorized(true);
      toast.success("You are now authorized to view this page.", {
        duration: 800,
      });
    } else {
      toast.error("You are not authorized to view this page.", {
        duration: 1000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-74px)] text-white">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center min-w-[80vw] sm:min-w-[400px]">
          <h1 className="mb-4 text-4xl font-black">Authenticate</h1>
          <input
            className="block w-full px-4 py-2 leading-normal text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="Secret key"
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
          <button
            className="px-4 py-2 mt-6 font-bold text-white rounded-lg bg-cred-soft-blue hover:bg-cred-light-blue"
            type="submit"
          >
            Authenticate
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthenticationForm;
