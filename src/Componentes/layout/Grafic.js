import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

import { useEffect, useState } from 'react';

const cores = ['#FFAEBC', '#A0E7E5', '#B4F8C8', '#FBE7C6'];

function Dashboard() {

     const [projects, setProjects] = useState([]);

    useEffect(() => {
    fetch("https://costs-api-iaie.onrender.com/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Erro ao carregar:", err));
    }, []);

    if (!projects || !Array.isArray(projects)) {
    return <p>Carregando dados...</p>;
    }
    
    const categoriasUnicas = Array.from(new Set(projects.map(p => p.category.name)));

    const categoriasData = categoriasUnicas.map(cat => ({
    name: cat,
    value: projects.filter(p => p.category.name === cat).length
    }));
    

  
  const gastosPorCategoria = ['infra', 'Design', 'Planejamento', 'Desenvolvimento'].map(cat => {
    const projetosCategoria = projects.filter(p => p.category.name === cat);
    const gasto = projetosCategoria.reduce((acc, p) => {
      const servicos = p.services ?? [];
      const total = servicos.reduce((soma, s) => soma + Number(s.cost), 0);
      return acc + total;
    }, 0);
    return { name: cat, value: gasto };
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard de Projetos</h2>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        <div>
          <h4>Projetos por Categoria</h4>
          <PieChart width={450} height={450}>
            <Pie data={categoriasData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
              {categoriasData.map((_, index) => (
                <Cell key={index} fill={cores[index % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        
        <div>
          <h4>Gastos por Categoria</h4>
          <BarChart width={400} height={300} data={gastosPorCategoria}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='value' fill="#6c5ce7" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}


export default Dashboard