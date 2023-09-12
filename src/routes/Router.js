import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Home = lazy(() => import("../views/Home.js"));
const Notes = lazy(() => import("../views/Notes.js"));
const View = lazy(() => import("../views/View.js"));
const Login = lazy(() => import("../views/Login.js"));
const Register = lazy(() => import("../views/Register.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const AddNotes = lazy(() => import("../views/AddNotes"));
const ModifyNotes = lazy(() => import("../views/ModifyNotes"));

/*****Routes******/
let token = localStorage.getItem("token");
token = token !== 'null' ? JSON.parse(token) : null;

// let index = localStorage.getItem("index");
// console.log(index);
// index = index !== 'null' ? JSON.parse(index) : 0;
// console.log(index);

// setInterval(()=>{
//   index = localStorage.getItem("index");
//   index = index !== 'null' ? JSON.parse(index) : 0;
//   // console.log(index)
// },100)

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout token={token}/>,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <Home /> ) },
      { path: "/notes", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <Notes /> ) },
      { path: `/notes/:token/:index`, exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <View /> ) },
      { path: "/about", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <About /> ) },
      { path: "/alerts", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <Alerts /> ) },
      { path: "/badges", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <Badges /> ) },
      { path: "/buttons", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <Buttons /> ) },
      { path: "/cards", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <Cards /> ) },
      { path: "/grid", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <Grid /> ) },
      { path: "/table", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <Tables /> ) },
      { path: "/forms", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <Forms /> ) },
      { path: "/breadcrumbs", exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <Breadcrumbs /> ) },
      { path: "/user/login", exact: true, element:  <Login /> },
      { path: "/user/register", exact: true, element: <Register /> },
      { path: `/user/modify/:token/:index`, exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <ModifyNotes /> ) },
      { path: `/user/add/:token/`, exact: true, element: !token ? ( <Navigate to='/user/login' /> ) : ( <AddNotes /> ) },
    ],
  },
];

export default ThemeRoutes;
