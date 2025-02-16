import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="Error404">
      <h1>404</h1>
      <p>Oops! Something is wrong.</p>
      <Link to={'/'} class="button-Error404">
        <FontAwesomeIcon icon={faHouse} /> Go Home page.
      </Link>
    </div>
  );
}

export default Error404