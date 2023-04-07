import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";

import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";


export default function Homepage() {
  const [todo, setTodo] = useState("");
  const [isEdit, setisEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState("");
  const [editId, setEditId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // read
        const unsubscribe = onSnapshot(
          collection(db, `users/${auth.currentUser.uid}/todos`),
          (snapshot) => {
            setTodos(
              snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              })
            );
          }
        );

        return () => unsubscribe();
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = async () => {
    try {
      await addDoc(collection(db, `users/${auth.currentUser.uid}/todos`), {
        todo: todo,
        done: false,
        date: Date.now(),
      });
      setTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  // edit
  const handleEdit = async (id, todo) => {
    setisEdit(true);
    setEditTodo(todo);
    setEditId(id);
  };

  const handleEditConfirm = async () => {
    try {
      await updateDoc(doc(db, `users/${auth.currentUser.uid}/todos`, editId), {
        todo: editTodo,
        done: false,
      });
      setEditId("");
      setEditTodo("");
      setisEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, `users/${auth.currentUser.uid}/todos`, id));
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="position-absolute top-0 start-50 translate-middle-x">
      <h1 className="mb-4">Todo App</h1>

      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Add todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={writeToDatabase}>
          Add
        </button>
      </div>

      {todos.map((todo) => (
        <div className="card mb-3" key={todo.id}>
          <div className="card-body d-flex justify-content-between align-items-center">
            {isEdit && editId === todo.id ? (
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Edit todo..."
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleEditConfirm}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setisEdit(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h5 className="card-title">{todo.todo}</h5>
                <div>
                  <button className="btn btn-primary" onClick={() => handleEdit(todo.id, todo.todo)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      <button className="btn btn-secondary" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}