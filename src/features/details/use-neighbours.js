import { useDispatch, useSelector } from 'react-redux';
import { loadNeighboursByBorder, selectNeighbours } from './details-slice';
import { useEffect } from 'react';

const useNeighbours = borders => {
  const dispatch = useDispatch();
  const neighbors = useSelector(selectNeighbours);

  useEffect(() => {
    if (borders.length) {
      dispatch(loadNeighboursByBorder(borders))
    }
  }, [borders, dispatch]);

  return neighbors;
}

export {useNeighbours};