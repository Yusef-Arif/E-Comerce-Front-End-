import { useEffect, useState } from "react";
import { apiUser, apiUsers } from "../../api/api";
import { Axios } from "../../api/axios";
import TableShow from "../../components/dashboard/Table";

const Users = () => {
  //all the useStats
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [Delete, setDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [limit, setLimit] = useState(5);

  //Get the current user
  useEffect(() => {
    Axios.get(`${apiUser}`)
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  //getting the users
  useEffect(() => {
    Axios.get(`/${apiUsers}`)
      .then((res) => {
        setUser(res.data.data);
        setNumOfPages(Math.ceil(res.data.total / limit));
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [Delete,page,limit]);

  const header = [
    { key: "name", name: "Name" },
    { key: "email", name: "Email" },
    { key: "role", name: "Role" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  //for handeling Delete
  async function HandelDelete(id) {
    await Axios.delete(`${apiUser}/${id}`).then(() => {
      setDelete((prave) => !prave);
    });
  }

  return (
    <div className=" rounded-lg p-2 ">
      <TableShow
        header={header}
        data={user}
        loading={loading}
        currentUser={currentUser}
        HandelDelete={HandelDelete}
        setpage={setpage}
        numOfPages={numOfPages}
        setLimit={setLimit}
        link={apiUser}
        setNumOfPages={setNumOfPages}
      />
    </div>
  );
};

export default Users;
