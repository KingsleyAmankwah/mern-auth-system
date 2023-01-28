import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { FILTER_USERS, selectUsers } from "../features/user/filterSlice";
import { getUsers } from "../features/user/userSlice";
import Spinner from "./Spinner";
// import ReactPaginate from "react-paginate";

export default function Users() {
  const dispatch = useDispatch();

  //   const [search, setSearch] = useState("");

  const { users, isLoading } = useSelector((state) => state.user);
  //   const filteredUsers = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(FILTER_USERS({ users, search }));
  //   }, [dispatch, users, search]);

  // Begin Pagination
  //   const itemsPerPage = 5;
  //   const [itemOffset, setItemOffset] = useState(0);

  //   const endOffset = itemOffset + itemsPerPage;
  //   const currentItems = filteredUsers.slice(itemOffset, endOffset);
  //   const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  // Invoke when user click to request another page.
  //   const handlePageClick = (event) => {
  //     const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
  //     setItemOffset(newOffset);
  //   };

  // End Pagination

  if (isLoading)
    return (
      <>
        {" "}
        <Spinner />{" "}
      </>
    );

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded "
          //   (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg "}>Users</h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {/* <th>Sn</th> */}
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  }
                >
                  Role
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  }
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => {
                const { _id, name, email, role, photo } = user;

                return (
                  <tr key={_id}>
                    {/* <td>{index + 1}</td> */}
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src={photo}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      <span className={"ml-3 font-semibold "}>{name}</span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {" "}
                      {email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {role}
                    </td>
                    {/* <td>
                          <ChangeRole _id={_id} email={email} />
                        </td> */}
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span>
                        <FaTrashAlt
                          size={20}
                          color="red"
                          //   onClick={() => confirmDelete(_id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      /> */}
    </>
  );
}
