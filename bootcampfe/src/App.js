import React from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/About/About";
import AdminCourses from "./components/Admin/AdminCourses/AdminCourses";
import CreateCourse from "./components/Admin/CreateCourse/CreateCourse";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Users from "./components/Admin/Users/Users";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import Contact from "./components/Contact/Contact";
import CoursePage from "./components/CoursePage/CoursePage";
import CreateCourseUser from "./components/CoursePage/CreateCourseUser";
import Courses from "./components/Courses/Courses";
import UserDashboardListView from "./components/Dashboard/UserdashBoardListView";
import CreateUserNote from "./components/Extras/CreateUserNote";
import OtpPage from "./components/Extras/OtpPage";
import ProfilePage from "./components/Extras/ProfilePage";
import UpdateProfile from "./components/Extras/UpdateProfile";
import ViewNotes from "./components/Extras/ViewNotes";

import Home from "./components/Home/Home";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import NotFound from "./components/Layout/NotFound/NotFound";
import PaymentFail from "./components/Payments/PaymentFail";
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import Subscribe from "./components/Payments/Subscribe";
import Request from "./components/Request/Request";
import ViewSingleNote from "./components/Extras/ViewSingleNote";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />
        <Route path="/create" element={<CreateCourseUser />} />
        <Route path="/create-note" element={<CreateUserNote />} />
        <Route path="/view-notes" element={<ViewNotes />} />
        <Route path="/view-single-note/*" element={<ViewSingleNote />} />
        <Route path="/userdashboard" element={<UserDashboardListView />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-page" element={<OtpPage />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/createcourse" element={<CreateCourse />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
