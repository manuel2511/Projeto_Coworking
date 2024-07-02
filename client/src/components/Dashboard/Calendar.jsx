import React from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./calendar.css";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const Calendario = () => {
  return (
    <>
      <Header />
      <NavBar />
      <main id="main" className="main">
        <div className="breadcrumb-container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active">Calendário</li>
            </ol>
          </nav>
        </div>
      <div>
        <DragAndDropCalendar
          defaultDate={moment().toDate()}
          defaultviews="month"
          events={[{}]}
          localizer={localizer}
          resizable
          className="calendar"
        />
      </div>
      </main>
      <Footer />
    </>
  );
};

export default Calendario;
