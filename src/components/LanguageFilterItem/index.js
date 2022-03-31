// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageItems, updateActiveTabId, isActive} = props
  const {id, language} = languageItems

  const getRespectiveRepos = () => {
    updateActiveTabId(id)
  }

  const activeClassName = isActive ? 'active-language-class' : ''

  return (
    <div>
      <li className="header-list-item">
        <button
          type="button"
          onClick={getRespectiveRepos}
          className={`default-button ${activeClassName}`}
        >
          <p>{language}</p>
        </button>
      </li>
    </div>
  )
}
export default LanguageFilterItem
