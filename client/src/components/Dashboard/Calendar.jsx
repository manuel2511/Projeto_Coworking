import React,{useState} from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import moment from "moment";
import 'moment/locale/pt-br';
import { Calendar, momentLocalizer  } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./calendar.css";

moment.locale('pt-br');
const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

// Defina as mensagens em português
const messages = {
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Dia inteiro',
  week: 'Semana',
  work_week: 'Semana de trabalho',
  day: 'Dia',
  month: 'Mês',
  previous: 'Anterior',
  next: 'Próximo',
  yesterday: 'Ontem',
  tomorrow: 'Amanhã',
  today: 'Hoje',
  agenda: 'Agenda',
  noEventsInRange: 'Não há eventos neste intervalo.',
  showMore: total => `+${total} mais`,
};

const Calendario = () => {
    const [eventos, setEventos] = useState([
      {
                id: 1,
                title: "Atividade1",
                start: new Date(2024,6,3,15,0,0),
                end:  new Date(2024,6,3,16,0,0),
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
          messages={messages}
        />
      </div>
      </main>
      <Footer />
    </>
  );
};

export default Calendario;
