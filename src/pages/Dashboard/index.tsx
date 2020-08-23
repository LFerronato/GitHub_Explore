import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi'

import { Title, Form, Repositories } from './styles'

import logoImg from '../../assets/logo.svg'

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [repositories, setRepositories] = useState([1])

  function handleAddRepository(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(newRepo)
  }

  return (
    <>
      <img src={logoImg} alt="logo do Github Explore" />
      <Title>Explore repositórios no Github.</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map(r => (
          <a href="/repository" >
            <img
              src="https://avatars0.githubusercontent.com/u/43012047?s=460&v=4"
              alt="Lucas Ferronato"
            />
            <div>
              <strong>lferronato/Semana-OmniStack11</strong>
              <p>(Backend/Frontend/Mobile) Developing a complete application -> Be-The-Hero</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}

      </Repositories>
    </>
  )
}

export default Dashboard;
