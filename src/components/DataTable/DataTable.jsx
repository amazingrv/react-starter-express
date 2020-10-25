import { memo, useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

function DataTable({ data, columns, idKey }) {
  const pageSizeOptions = [5, 10, 25, 50];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [items, setItems] = useState([]);
  const [first, setFirst] = useState(0);
  const [current, setCurrent] = useState(0);
  const [last, setLast] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      setFirst(1);
    }
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      setCurrent(1);
    }
  }, [data, pageSize]);

  useEffect(() => {
    if (data.length > 0) {
      const pages = Math.ceil(data.length / pageSize);

      setLast(pages);
      setItems(data.slice((current - 1) * pageSize, current * pageSize));
    }
  }, [data, pageSize, current]);

  const onSelect = event => {
    setPageSize(event.target.value);
  };

  const onPrevious = () => {
    if (current > first) {
      setCurrent(current - 1);
    }
  };

  const onNext = () => {
    if (current < last) {
      setCurrent(current + 1);
    }
  };

  const onFirst = () => {
    setCurrent(first);
  };

  const onLast = () => {
    setCurrent(last);
  };

  const onClickNumber = number => {
    setCurrent(number);
  };

  const genRowData = () => {
    const elements = [];
    for (const item of items) {
      const rowData = [];
      for (let i = 0; i < columns.length; i++) {
        rowData.push(
          <td key={`${item[idKey]}-${i}`}>{item[columns[i].key]}</td>
        );
      }
      elements.push(<tr key={item[idKey]}>{rowData}</tr>);
    }
    return elements;
  };

  const genPaginationRows = () => {
    const maxButtonsOnOneSide = 4;
    const left = [];
    const center = [];
    const right = [];

    const pagesOnLeft = current - first;
    const pagesOnRight = last - current;
    let countLeft = 0;
    let countRight = 0;

    if (pagesOnLeft > 0 && pagesOnRight === 0) {
      if (pagesOnLeft > maxButtonsOnOneSide) {
        countLeft = maxButtonsOnOneSide;
      } else if (pagesOnLeft >= 2) {
        countLeft = 2;
      } else {
        countLeft = 1;
      }
    } else if (pagesOnRight > 0 && pagesOnLeft === 0) {
      if (pagesOnRight > maxButtonsOnOneSide) {
        countRight = maxButtonsOnOneSide;
      } else if (pagesOnRight > 2) {
        countRight = 2;
      } else {
        countRight = 1;
      }
    } else if (pagesOnLeft >= 2 && pagesOnRight >= 2) {
      countLeft = 2;
      countRight = 2;
    } else if (pagesOnLeft > 2 && pagesOnRight > 0) {
      countLeft = maxButtonsOnOneSide - 1;
      countRight = 1;
    } else if (pagesOnLeft > 0 && pagesOnRight > 2) {
      countLeft = 1;
      countRight = maxButtonsOnOneSide - 1;
    }

    if (current > 0) {
      for (let i = current - 1, j = 1; i >= first && j <= countLeft; i--, j++) {
        const element = (
          <li key={i} className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => onClickNumber(i)}
            >
              {i}
            </button>
          </li>
        );
        left.splice(0, 0, element);
      }
      const element = (
        <li key={current} className="page-item active">
          <button
            type="button"
            className="page-link"
            onClick={() => onClickNumber(current)}
          >
            {current}
          </button>
        </li>
      );
      center.push(element);
      for (let i = current + 1, j = 1; i <= last && j <= countRight; i++, j++) {
        const element = (
          <li key={i} className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => onClickNumber(i)}
            >
              {i}
            </button>
          </li>
        );
        right.push(element);
      }
    }

    return [...left, ...center, ...right];
  };

  return (
    <div>
      <div className="table-responsive" style={{ height: '50vh' }}>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              {columns.map(i => (
                <th key={i.header}>{i.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{genRowData()}</tbody>
        </table>
      </div>
      <div className="d-flex mt-2">
        <div className="d-flex">
          <Input
            type="select"
            name="pageSize"
            onChange={onSelect}
            value={pageSize}
          >
            {pageSizeOptions.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Input>
        </div>
        <div className="d-flex ml-auto">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li
                className={`page-item ${current === first ? 'disabled' : ''}`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={onFirst}
                  disabled={current === first}
                >
                  <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </button>
              </li>
              <li
                className={`page-item ${current === first ? 'disabled' : ''}`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={onPrevious}
                  disabled={current === first}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
              </li>
              {genPaginationRows()}
              <li className={`page-item ${current === last ? 'disabled' : ''}`}>
                <button
                  type="button"
                  className="page-link"
                  onClick={onNext}
                  disabled={current === last}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </li>
              <li className={`page-item ${current === last ? 'disabled' : ''}`}>
                <button
                  type="button"
                  className="page-link"
                  onClick={onLast}
                  disabled={current === last}
                >
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default memo(DataTable);
