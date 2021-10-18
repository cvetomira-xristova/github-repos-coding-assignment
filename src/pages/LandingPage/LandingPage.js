import React from 'react';
import styles from './LandingPage.module.css';
import ListItem from '../../components/ListItem/ListItem';
import { getRepositoriesOfUser } from '../../api/RepositoryCalls';
import useFetch from '../../hooks/useFetch';

const nameOfUser = 'felangel';

export default function LandingPage() {
  const { data, hasError, isLoading } = useFetch(getRepositoriesOfUser, [nameOfUser]);

  return (
    <>
      {isLoading && <p>Loading.. </p>}
      {hasError && <p>Something went wrong</p>}
      {!hasError && !isLoading && (
        <>
          <h1 className={styles.h1}>Explore Repositories</h1>
          <div className={styles.reposContainer}>
            {data?.map((repo) => (
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
