import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { publicRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  function getSize(method) {
    return document.documentElement[method] || document.body[method];
  }
  getSize("scrollTop");
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            !publicRoutes ? '' : publicRoutes.map((route, index) => {
              const Page = route.component;

              let Layout = DefaultLayout;

              if(route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                  <Route
                    key={index}
                    path={route.path}
                    element={ <Layout><Page /></Layout> }
                  />
                  )
            })
          }
        </Routes>
        <ToastContainer style={{minWidth: '300px', maxWidth: '320px', top: '20px'}}/>
      </div>
    </Router>
  );
}

export default App;
