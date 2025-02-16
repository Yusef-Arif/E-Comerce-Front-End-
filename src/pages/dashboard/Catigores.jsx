import { useEffect, useState } from "react";
import { cat, CAT } from "../../api/api";
import { Axios } from "../../api/axios";
import TableShow from "../../components/dashboard/Table";

const Catigores = () => {
  //all the useStats
  const [catigores, setCatigores] = useState([]);
  const [Delete, setDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [limit, setLimit] = useState(5);

  //getting the Catigores
  useEffect(() => {
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((res) => {
        setCatigores(res.data.data);
        setNumOfPages(Math.ceil(res.data.total / limit));
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [Delete, page, limit]);

  const header = [
    { key: "title", name: "Title" },
    { key: "image", name: "Image" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  //for handeling Delete
  async function HandelDelete(id) {
    await Axios.delete(`${cat}/${id}`).then(() => {
      setDelete((prave) => !prave);
    });
  }

  return (
    <div className=" rounded-lg p-2 ">
      <TableShow
        header={header}
        data={catigores}
        loading={loading}
        page={page}
        limit={limit}
        HandelDelete={HandelDelete}
        numOfPages={numOfPages}
        setpage={setpage}
        setLimit={setLimit}
        link={cat}
        setNumOfPages={setNumOfPages}
      />
    </div>
  );
};

export default Catigores;
