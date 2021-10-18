import { useHistory } from 'react-router-dom';
import styles from './ListItem.module.css';

export default function ListItem({ nameOfRepo, ownerName, avatarUrl }) {
  const history = useHistory();
  const handleClickOnListItem = (repoName) => history.push(`/${repoName}`);

  return (
    <div
      className={styles.listItemContainer}
      onClick={() => handleClickOnListItem(nameOfRepo)}
    >
      <div className={styles.avatarContainer}>
        <img src={avatarUrl} alt='Repository owner' className={styles.avatar} />
      </div>
      <div className={styles.detailsContainer}>
        <h3 className={styles.h3}>{nameOfRepo}</h3>
        <h4 className={styles.h4}>
          Built by <span> {ownerName} </span>
        </h4>
      </div>
    </div>
  );
}
