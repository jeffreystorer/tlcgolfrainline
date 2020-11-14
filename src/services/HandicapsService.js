/* eslint-disable import/no-anonymous-default-export */
import firebase from "../firebase";

const getAll = () => {
  const db = firebase.ref("/handicaps");
  return db;
};

const getHandicaps = (key) => {
  const db = firebase.ref("/handicaps");
  return db.child(key);
};

export default {
  getAll,
  getHandicaps
};
