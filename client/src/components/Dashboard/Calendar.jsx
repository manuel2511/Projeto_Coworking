import React,{useState} from "react";
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
    const [eventos, setEventos] = useState([
      {
                id: 1,
                title: "Atividade1",
                start: new Date(2024,6,2,15,0,0),
                end: new Date(2024,6,3,15,0,0),
                desc: "Atividade1 desc",
                color: "danger",
                tipo: "Atividade",
            },
            {
                id: 2,
                title: "Atividade2",
                start: new Date(2024,6,2,15,0,0),
                end: new Date(2024,6,5,15,0,0),
                desc: "Atividade2 desc",
                color: "blue",
                tipo: "Atividade",
            },
        ]
    );
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
          events={eventos}
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
