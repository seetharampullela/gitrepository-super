// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {popularRepoItem} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = popularRepoItem

  return (
    <li className="repos-list-item">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="repo-name">{name}</h1>
      <div className="bottom-flex">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon-image"
        />
        <p>{starsCount}</p>
      </div>
      <div className="bottom-flex">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon-image"
        />
        <p>{forksCount}</p>
      </div>
      <div className="bottom-flex">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="icon-image"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
