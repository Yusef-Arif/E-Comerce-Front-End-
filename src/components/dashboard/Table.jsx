import { Link } from "react-router-dom";
import Loader from "../Loader2";
import { Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import setDate from "../../helpers/setDate";

const TableShow = (props) => {
  const currentUser = props.currentUser || false;
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchByDate, setSearchByDate] = useState("");
  const [filterdData, setFilterdData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("0");
  const dataFilterdByDate = props.data.filter(
    (prev) =>
      setDate(prev.created_at) === searchByDate ||
      setDate(prev.updated_at) === searchByDate
  );
  const filterdDataFilteredByDate = filterdData.filter(
    (prev) =>
      setDate(prev.created_at) === searchByDate ||
      setDate(prev.updated_at) === searchByDate
  );
  const data =
    search.length > 0 && searchByDate.length > 0
      ? filterdDataFilteredByDate
      : search.length > 0
      ? filterdData
      : searchByDate.length > 0
      ? dataFilterdByDate
      : props.data;
  const head = props.header.map((e, index) => <th key={index}>{e.name}</th>);

  console.log("--------------");
  console.log(searchByDate);

  //for filtering the data from the backend
  async function getFilterdData() {
    try {
      setLoading(true);
      await Axios.post(`${props.link}/search?title=${search}`).then((data) => {
        setFilterdData(data.data);
        console.log(data.data);
        setResult(data.data.length);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  //for not to have to make too many requists
  useEffect(() => {
    const debounce = setTimeout(() => {
      getFilterdData();
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  //for display the data in the table
  const body = data.map((e1, key) => {
    return (
      <>
        {props.loading && <Loading />}
        <tr key={key}>
          <td>{e1.id}</td>
          {props.header.map((e2, index) => (
            <td key={index}>
              {e1[e2.key] === "1995" ? (
                "Admin"
              ) : e1[e2.key] === "2001" ? (
                "User"
              ) : e1[e2.key] === "1996" ? (
                "Writter"
              ) : e1[e2.key] === "2004" ? (
                "Product Manger"
              ) : e2.key === "created_at" || e2.key === "updated_at" ? (
                setDate(e1[e2.key])
              ) : e2.key === "image" ? (
                <img className=" w-4" src={`${e1[e2.key]}`} alt="" />
              ) : e2.key === "images" ? (
                <div className=" d-flex justify-content-start align-items-center gap-3">
                  {e1[e2.key].map((e, imgIndex) => (
                    <img
                      key={imgIndex}
                      width="50px"
                      src={`${e.image}`}
                      alt=""
                    />
                  ))}
                </div>
              ) : (
                e1[e2.key]
              )}
              {currentUser && e1[e2.key] === currentUser.name && "(You)"}
            </td>
          ))}
          <td>
            <div className="d-flex gap-3 justify-content-center align-items-center">
              <Link to={`${e1.id}`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-dark fs-4 cursor-pointer"
                />
              </Link>
              {(currentUser.name !== e1.name || !currentUser) && (
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => props.HandelDelete(e1.id)}
                  className="text-danger fs-4 cursor-pointer"
                />
              )}
            </div>
          </td>
        </tr>
      </>
    );
  });

  //for setting the buttons for pagination
  const pagesButtons = () => {
    const buttons = [];
    for (let i = 1; i <= props.numOfPages; i++) {
      buttons.push(
        <div
          key={i}
          onClick={() => {
            props.setpage(i);
            setActivePage(i);
          }}
          className={`pagesButtons ${activePage === i ? "activeButton" : ""}`}
        >
          <h3>{i}</h3>
        </div>
      );
    }
    return <>{buttons}</>;
  };

  return (
    <section>
      <div className="mb-3 d-flex justify-content-between align-items-center gap-3">
        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
        <Form.Control
          type="search"
          placeholder="search..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p className="text-white w-100 mb-0">Result: {result}</p>
      </div>
      <div className="mb-3 d-flex justify-content-between align-items-center gap-3">
        <FontAwesomeIcon icon={faCalendarDays} color="white" />
        <Form.Control
          type="date"
          value={searchByDate}
          onChange={(e) => setSearchByDate(e.target.value)}
        />
        <p className="text-white w-100 mb-0">Result: {result}</p>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            {head}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading || loading ? (
            <tr>
              <td colSpan={12} className="bg-white">
                <Loader />
              </td>
            </tr>
          ) : (
            body
          )}
        </tbody>
      </Table>
      {search.length === 0? (
        <div className=" d-flex justify-content-between align-items-center gap-3 border border-white rounded-2 p-3">
          <Form.Group className=" bg-dark" controlId="formBasicName">
            <Form.Select
              name="category"
              onChange={(event) => props.setLimit(event.target.value)}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={13}>13</option>
            </Form.Select>
          </Form.Group>
          <div className=" d-flex justify-content-center align-items-center gap-3">
            {pagesButtons()}
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default TableShow;
