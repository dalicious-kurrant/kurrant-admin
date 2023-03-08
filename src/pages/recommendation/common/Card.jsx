import styled from 'styled-components';
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_CARD_BORDER,
} from '../../../shared/recommendation-constants';

const Card = styled.div`
  box-sizing: border-box;
  border: ${DEFAULT_CARD_BORDER};
  border-radius: ${DEFAULT_BORDER_RADIUS};
  background-color: white;
`;

export default Card;
