import React, { useState, useEffect } from 'react';
import styles from './RepositoryPage.module.css';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getRepository } from '../../api/RepositoryCalls';

const nameOfUser = 'felangel';

export default function RepositoryPage() {
  const history = useHistory();
  const { repositoryName } = useParams();
  const [repositoryData, setRepositoryData] = useState({});
  const [isLoading, setIsLoading] = useState(false); // ADD LOADER
  const [hasError, setHasError] = useState(false);

  const handleGoBackClick = () => history.push('/');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getRepository(nameOfUser, repositoryName);
        setRepositoryData(response.data);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [repositoryName]);

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
                  src={repositoryData?.owner?.avatar_url}
                  alt='Repository owner'
                  className={styles.avatar}
                />
                <h6>
                  Built by <span> {repositoryData?.owner?.login} </span>
                </h6>
              </div>

              <div className={styles.detailsItem}>
                <h2 className={styles.h2}> {repositoryData?.name} </h2>
                <h3 className={styles.h3}> {repositoryData?.description}</h3>
              </div>
            </div>

            <div className={styles.detailsSection}>
              <div className={styles.detailsItem}>
                <h5 className={styles.h5}>
                  Open Issues {repositoryData?.open_issues_count}
                </h5>
                <h5 className={styles.h5}>
                  Forks {repositoryData?.forks_count}
                </h5>
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
