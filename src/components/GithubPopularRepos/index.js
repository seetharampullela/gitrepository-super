import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}
// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    popularReposList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getAllRepos()
  }

  updateActiveTabId = id => {
    this.setState({activeId: id}, this.getAllRepos)
    console.log(id)
  }

  getAllRepos = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: apiConstants.inProgress})

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedRepos = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        popularReposList: updatedRepos,
        apiStatus: apiConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getFilteredRepos = () => {
    const {activeId, popularReposList} = this.state
    const filteredRepos = popularReposList.filter(
      eachRepo => eachRepo.id === activeId,
    )
    this.setState({popularReposList: filteredRepos})
  }

  renderFailurePage = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoadingPage = () => (
    <div testid="loader" className="loader-img">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderReposList = () => {
    const {popularReposList} = this.state

    return (
      <ul className="repo-list-container">
        {popularReposList.map(each => (
          <RepositoryItem popularRepoItem={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderReposList()
      case apiConstants.failure:
        return this.renderFailurePage()
      case apiConstants.inProgress:
        return this.renderLoadingPage()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state

    return (
      <div className="repos-bg-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="header-list-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              languageItems={each}
              key={each.id}
              isActive={each.id === activeId}
              updateActiveTabId={this.updateActiveTabId}
            />
          ))}
        </ul>
        {this.renderResultView()}
      </div>
    )
  }
}

export default GithubPopularRepos
