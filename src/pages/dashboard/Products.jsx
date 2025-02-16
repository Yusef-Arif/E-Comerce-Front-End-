import { useEffect, useState } from "react";
import { pro, PRO } from "../../api/api";
import { Axios } from "../../api/axios";
import TableShow from "../../components/dashboard/Table";

const Products = () => {
  //all the useStats
  const [products, setProducts] = useState([]);
  const [Delete, setDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [limit, setLimit] = useState(5);

  //getting the Catigores
  useEffect(() => {
    Axios.get(`/${PRO}?limit=${limit}&page=${page}`)
      .then((res) => {
        setProducts(res.data.data);
        setNumOfPages(Math.ceil(res.data.total / limit));
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [Delete, limit, page]);

  const header = [
    { key: "title", name: "Title" },
    { key: "images", name: "Images" },
    { key: "price", name: "Price" },
    { key: "discount", name: "Discount" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  //for handeling Delete
  async function HandelDelete(id) {
    await Axios.delete(`${pro}/${id}`).then(() => {
      setDelete((prave) => !prave);
    });
  }

  return (
    <div className=" rounded-lg p-2 ">
      <TableShow
        header={header}
        data={products}
        loading={loading}
        HandelDelete={HandelDelete}
        setpage={setpage}
        numOfPages={numOfPages}
        setLimit={setLimit}
        link={pro}
        setNumOfPages={setNumOfPages}
      />
    </div>
  );
};

export default Products;
