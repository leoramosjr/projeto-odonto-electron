import { Router, Route } from 'electron-router-dom';
import ClientList from '../pages/ClientList';
import ClientView from '../pages/ClientView';
import Callendar from '../pages/Calendar';
import Tasks from '../pages/Tasks'

export default function AppRoutes(): JSX.Element {
  return (
    <Router
        main={
            <>
                <Route path="" element={<Callendar />} />
                <Route path="clients">
                    <Route path="" element={<ClientList />} index />
                    <Route path=":id" element={<ClientView />} />
                </Route>
                <Route path="tasks" element={<Tasks />} />
            </>
        }
    />
  );
}