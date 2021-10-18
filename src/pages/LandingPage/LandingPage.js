import React, { useState, useEffect } from 'react';
import styles from './LandingPage.module.css';
import ListItem from '../../components/ListItem/ListItem';
import { getRepositoriesOfUser } from '../../api/RepositoryCalls';

const nameOfUser = 'felangel';

export default function LandingPage() {
  const [reposData, setReposData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getRepositoriesOfUser(nameOfUser);
        console.log(response);
        setReposData(response.data);
      } catch (error) {
        console.log(error.response);
        setHasError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && <p>Loading.. </p>}
      {hasError && <p>Something went wrong</p>}
      {!hasError && !isLoading && (
        <>
          <h1 className={styles.h1}>Explore Repositories</h1>
          <div className={styles.reposContainer}>
            {reposData?.map((repo) => (
              <ListItem
                key={repo.id}
                nameOfRepo={repo.name}
                ownerName={repo.owner.login}
                avatarUrl={repo.owner.avatar_url}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
