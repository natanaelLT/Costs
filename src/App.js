import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Componentes/Pages/Home';
import Contato from './Componentes/Pages/Contato';
import Company from './Componentes/Pages/Company';
import NovoProjeto from './Componentes/Pages/NovoProjeto';
import Container from './Componentes/layout/Container';
import Navbar from './Componentes/layout/Navbar';
import Footer from './Componentes/layout/Footer';
import Projeto from './Componentes/Pages/Projeto';
import Project from './Componentes/Pages/Project';


function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Container customClass='min-height'>
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/Projeto' element={<Projeto />}></Route>
              <Route path='/Contato' element={<Contato />}></Route>
              <Route path='/Company' element={<Company />}></Route>
              <Route path='/NovoProjeto' element={<NovoProjeto />}></Route>
              <Route path="/Project/:id" element={<Project />} />
            </Routes>
          </Container>
         <Footer/>
      </Router>
    </div>
  );
}

export default App;
