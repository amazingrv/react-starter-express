import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
  selectLoading,
} from '../../redux/slices/counter.slice';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Spinner,
} from 'reactstrap';

const Counter = () => {
  const count = useSelector(selectCount);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div className="form-inline justify-content-center">
        <Button
          color="success"
          size="small"
          onClick={() => dispatch(increment())}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
        <div>
          <h2 style={{ minWidth: '120px' }}>{count}</h2>
        </div>
        <Button
          color="danger"
          size="small"
          onClick={() => dispatch(decrement())}
        >
          <FontAwesomeIcon icon={faMinusCircle} />
        </Button>
      </div>
      <div className="form-inline justify-content-center">
        <InputGroup>
          <Input
            type="number"
            value={incrementAmount}
            onChange={event => setIncrementAmount(event.target.value)}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              onClick={() =>
                dispatch(incrementByAmount(Number(incrementAmount) || 0))
              }
            >
              Add
            </Button>
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              onClick={() =>
                dispatch(incrementAsync(Number(incrementAmount) || 0))
              }
            >
              Add Async {loading && <Spinner size="sm" color="light" />}
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
};

export default Counter;
