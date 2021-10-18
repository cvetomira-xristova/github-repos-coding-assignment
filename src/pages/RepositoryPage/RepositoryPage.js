import React from 'react';
import styles from './RepositoryPage.module.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getRepository } from '../../api/RepositoryCalls';
import useFetch from '../../hooks/useFetch';

const nameOfUser = 'felangel';

export default function RepositoryPage() {
  const history = useHistory();
  const { repositoryName } = useParams();
  const { data, hasError, isLoading } = useFetch(getRepository, [nameOfUser, repositoryName]);

  const handleGoBackClick = () => history.push('/');

  return (
    <>
      {isLoading && <p>Loading..</p>}
      {hasError && <p>Something went wrong</p>}
      {!hasError && !isLoading && (
        <>
          <div className={styles.detailsContainer}>
            <div className={styles.detailsSection}>
              <div className={styles.detailsItem}>
                <img
                  src={data?.owner?.avatar_url}
                  alt='Repository owner'
                  className={styles.avatar}
                />
                <h6>
                  Built by <span>{data?.owner?.login}</span>
                </h6>
              </div>
              <div className={styles.detailsItem}>
                <h2 className={styles.h2}>{data?.name}</h2>
                <h3 className={styles.h3}>{data?.description}</h3>
              </div>
            </div>
            <div className={styles.detailsSection}>
              <div className={styles.detailsItem}>
                <h5 className={styles.h5}>
                  Open Issues {data?.open_issues_count}
                </h5>
                <h5 className={styles.h5}>Forks{data?.forks_count}</h5>
              </div>
            </div>
          </div>
          <div className={styles.goBackButtonContainer}>
            <button
              onClick={() => handleGoBackClick()}
              className={styles.goBackButton}
            >
              Go back
            </button>
          </div>
        </>
      )}
    </>
  );
}
