import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import { Header, RepositoryInfo, Issues } from './styles'

interface RepositoryParams {
  repository: string
}
interface IssueDTO {
  id: number
  html_url: string
  title: string
  user: {
    login: string
  }
}

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
  forks_count: number
  open_issues_count: number
  stargazers_count: number
}
const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>()
  // const selectedRepo = {
  //   description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
  //   full_name: "facebook/react",
  //   homepage: "https://reactjs.org",
  //   html_url: "https://github.com/facebook/react",
  //   id: 10270250,
  //   language: "JavaScript",
  //   name: "react",
  //   owner: {
  //     avatar_url: "https://avatars3.githubusercontent.com/u/69631?v=4",
  //     login: "facebook"
  //   },
  //   forks_count: 19877,
  //   open_issues_count: 1038,
  //   stargazers_count: 89761
  // }
  const [issues, setIssues] = useState<IssueDTO[]>([])
  const [selectedRepo, setSelectedRepo] = useState<IrepoDTO | null>(null)

  useEffect(() => {
    async function loadData(): Promise<void> {
      const [issuesLoaded] = await Promise.all([
        api.get<IssueDTO[]>(`repos/${params.repository}/issues`)
      ])
      setIssues(issuesLoaded.data)
    }
    loadData()

    const storedRepos = localStorage.getItem('@GithubExplorer:respositories')
    if (storedRepos) {
      const Repos: IrepoDTO[] = JSON.parse(storedRepos)
      const selRep = Repos.find((st: IrepoDTO) => st.full_name === params.repository)
      if (selRep) setSelectedRepo(selRep)
    }
  }, [params.repository])

  return (
    <>
      <Header>
        <img src={logoImg} alt="logo do Github Explore" />
        <Link to="/">
          <FiChevronLeft size={16} />
            Voltar
          </Link>
      </Header>
      {selectedRepo && (
        <RepositoryInfo>
          <header>
            <img
              src={selectedRepo.owner.avatar_url}
              alt={selectedRepo.owner.login}
            />
            <div>
              <strong>{selectedRepo.full_name}</strong>
              <p>{selectedRepo.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{selectedRepo.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{selectedRepo.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{selectedRepo.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map(i => (
          <a key={i.id} target="_blank" href={i.html_url}>
            <div>
              <strong>{i.title}</strong>
              <p>{i.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}

      </Issues>
    </>
  );
}

export default Repository;
