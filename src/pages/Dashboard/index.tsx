import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

import { Title, Form, Repositories, Error } from './styles'

import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

interface IrepoDTO {
  id: number
  name: string
  full_name: string
  private: boolean
  owner: {
    login: string
    id: number
    avatar_url: string
    url: string
  }
  html_url: string
  description: string
  homepage: string
  language: string
  forks: number
  open_issues: number
}
const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState('')
  const [newRepo, setNewRepo] = useState('')
  const [repositories, setRepositories] = useState<IrepoDTO[]>(
    () => {
      const storedRepos = localStorage.getItem('@GithubExplorer:respositories')
      if (storedRepos) {
        return JSON.parse(storedRepos)
      } else {
        return []
      }
    }
  )

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:respositories', JSON.stringify(repositories))
  }, [repositories])

  async function handleAddRepository(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!newRepo) {
      setInputError('Digite um valor para para pesquisa 😁')
      return
    }
    try {
      const response = await api.get<IrepoDTO>(`repos/${newRepo}`)
      const exists = repositories.find(r => r.id === response.data.id)

      if (exists) {
        setInputError('Repo já listado!')
      } else {
        setRepositories([...repositories, response.data])
        setNewRepo('')
        setInputError('')
      }
    } catch (error) {
      setInputError('Repositório não encontrado! 🤔')
    }
  }

  return (
    <>
      <img src={logoImg} alt="logo do Github Explore" />
      {/* {repositories.map(r => (<p>{r.id}</p>))} */}
      <Title>Explore repositórios no Github.</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map(r => (
          <Link key={r.id} to={`/repositories/${r.full_name}`} >
            <img
              src={r.owner.avatar_url}
              alt={r.owner.login}
            />
            <div>
              <strong>{r.full_name}</strong>
              <p>{r.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}

      </Repositories>
    </>
  )
}

export default Dashboard;
