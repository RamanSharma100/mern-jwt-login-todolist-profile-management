import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBBtn, MDBCol, MDBInputGroup, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { toast } from "react-toastify";

const TodoList = () => {
  const [item, setItem] = useState("");

  const { token } = useSelector(
    (state) => ({
      token: state.auth.token,
    }),
    shallowEqual
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.trim() === "") {
      toast.error("Please enter a task!");
      return;
    }
  };

  return (
    <MDBRow>
      <h1 className="text-center display-2 mt-5">Todo List</h1>
      <MDBCol md="6" className="mx-auto my-4">
        <form className="w-100" onSubmit={handleSubmit}>
          <MDBInputGroup className="mb-3">
            <input
              className="form-control"
              placeholder="Enter todo"
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <MDBBtn>
              <FontAwesomeIcon icon={faPlusCircle} /> ADD
            </MDBBtn>
          </MDBInputGroup>
        </form>

        {/* all todos */}
        <div className="list-group mt-5">
          <div className="list-group-item pb-4 px-5 pt-3">
            <div className="d-flex align-items-center justify-content-end gap-2">
              <p className="ml-auto my-0 text-end small">12:00</p>
              <small className="badge badge-danger">Done</small>
              <small className="badge badge-warning">TODO</small>
            </div>
            <div className="d-flex mt-2 justify-content-between align-items-center">
              <h5 className="mb-1">Todo 1</h5>
              <button className="btn btn-sm text-danger shadow-0">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        </div>
      </MDBCol>
    </MDBRow>
  );
};

export default TodoList;
