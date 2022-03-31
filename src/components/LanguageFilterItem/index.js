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
        <div className={`${activeClassName}`}>
          <button
            type="button"
            onClick={getRespectiveRepos}
            className="default-button"
          >
            <p>{language}</p>
          </button>
        </div>
      </li>
    </div>
  )
}
export default LanguageFilterItem
