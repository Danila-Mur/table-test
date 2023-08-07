import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { selectFilter, setCurrentPage, setSort } from '../../store/filter/filter.slice';
import { fetchPosts } from '../../store/posts/posts.api';
import { selectPosts } from '../../store/posts/posts.slice';
import { Pagination } from '../Pagination';
import styles from './TablePosts.module.scss';

const sortProperty = [
  { name: 'ID', property: 'id', with: '8.4%' },
  { name: 'Заголовок', property: 'title', with: '33.5%' },
  { name: 'Описание', property: 'body', with: '21%' },
];

export const TablePosts = () => {
  const [flip, setFlip] = useState(false);
  const [selectedIconIndex, setSelectedIconIndex] = useState(-1);

  const dispatch = useDispatch();

  const { posts, status } = useSelector(selectPosts);
  const { currentPage, searchValue, sort } = useSelector(selectFilter);

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const onClickSortItem = (item, index) => {
    if (selectedIconIndex === index) {
      setSelectedIconIndex(-1);

      dispatch(setSort({ property: item.property }));

      setFlip(false);
    } else {
      setSelectedIconIndex(index);

      const isDescending = sort.property === `-${item.property}`;

      if (isDescending) {
        dispatch(setSort({ property: item.property }));
        setFlip(false);
      } else {
        dispatch(setSort({ property: `-${item.property}` }));
        setFlip(true);
      }
    }
  };

  useEffect(() => {
    const sortBy = sort.property.replace('-', '');
    const order = sort.property.includes('-') ? 'desc' : 'asc';

    dispatch(fetchPosts({ currentPage, searchValue, sortBy, order }));
  }, [currentPage, searchValue, sort.property]);

  return status === 'error' ? (
    <>
      <h1>
        <span>😕</span>
        <br />
        Произошла ошибка
      </h1>
    </>
  ) : status === 'loading' ? (
    <Spinner className="position-absolute end-50" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableThead}>
            <tr>
              {sortProperty.map((item, index) => (
                <th key={item.property} onClick={() => onClickSortItem(item, index)} width={item.with}>
                  {item.name}
                  <svg
                    className={styles.icon}
                    style={{ transform: selectedIconIndex === index && flip ? 'rotate(180deg' : '' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                  >
                    <line x1="0.353553" y1="0.646447" x2="6.18011" y2="6.47301" stroke="#FCFCFC" />
                    <line x1="5.64645" y1="6.30331" x2="11.3033" y2="0.646453" stroke="white" />
                  </svg>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </>
  );
};
