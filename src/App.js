import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => setRepositories(response.data))
  }, [])


  async function handleAddRepository() {
    const { data: repository } = await api.post('/repositories', {
      title: 'teste 1',
      url: 'kjhdfsafs',
      techs: ['node', 'react']
    })

    console.log(repository);

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const newRepositoriesList = repositories.filter( ele => ele.id !== id)

    setRepositories(newRepositoriesList)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
            </li>

          ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
