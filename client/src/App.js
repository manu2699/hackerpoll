import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import Loader from "react-loader-spinner"
import PrivateRoute from "./utils/PrivateRoute";
import "./styles/css/main.css";

const SignIn = lazy(() => import("./pages/auth/signin"));
const Signup = lazy(() => import("./pages/auth/signup"));

const UserHome = lazy(() => import("./pages/user/index.js"));
const CandiatePage = lazy(() => import("./pages/user/candidateDetails"));

const AdminHome = lazy(() => import("./pages/admin/index"));
const AddCandidate = lazy(() => import("./pages/admin/addCanditate"));
const EditCandidate = lazy(() => import("./pages/admin/editCandidate"));

function App() {
  return (
    <Suspense fallback={
      <center className="loader">
        <Loader type="Oval" color="#1194ff" height={150} width={150} />
      </center>
    }>
      <BrowserRouter>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={Signup} />

        <PrivateRoute type="user" exact path="/" component={UserHome} />
        <PrivateRoute type="user" exact path="/candidate/:id" component={CandiatePage} />

        <PrivateRoute type="admin" exact path="/admin" component={AdminHome} />
        <PrivateRoute type="admin" exact path="/admin/add/candidate" component={AddCandidate} />
        <PrivateRoute type="admin" exact path="/admin/edit/candidate/:id" component={EditCandidate} />

      </BrowserRouter>
    </Suspense>
  );
}

export default App;
