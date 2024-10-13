import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCopy } from "@fortawesome/free-solid-svg-icons";

const PasswordCell = ({ item }) => {
  const [isVisible, setIsVisible] = useState(false);

  const copyText = (text) => {
    navigator.clipboard.writeText(item.password)
      .then(() => alert("Password copied!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <td className="py-2 border border-black text-center w-32">
      <span>{isVisible ? item.password : "••••••••"}</span>
      
      {/* Toggle Visibility Icon */}
      <FontAwesomeIcon
        icon={isVisible ? faEyeSlash : faEye}
        onClick={() => setIsVisible(!isVisible)}
        className="cursor-pointer px-2 w-5"
        title={isVisible ? "Hide Password" : "Show Password"}
        aria-label={isVisible ? "Hide Password" : "Show Password"}
      />
      
      {/* Copy Icon */}
      <FontAwesomeIcon
        icon={faCopy}
        onClick={() => copyText(item.password)}
        className="cursor-pointer px-2 w-5"
        title="Copy Password"
        aria-label="Copy Password"
      />
    </td>
  );
};

export default PasswordCell;
