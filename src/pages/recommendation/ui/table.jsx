import styled from 'styled-components';
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_DIVIDER_BORDER,
} from '../../../shared/recommendation-constants';

export const StyledTable = styled.table`
  position: relative;
  width: 100%;
  text-align: left;
  font-size: 14px;
  border: ${DEFAULT_DIVIDER_BORDER};
  border-collapse: collapse;
  border-radius: ${DEFAULT_BORDER_RADIUS};
`;

export const StyledThead = styled.thead``;

export const StyledTh = styled.th`
  background-color: #fafafa;
  border: ${DEFAULT_DIVIDER_BORDER};
  font-weight: normal;
  padding: 16px;
`;

export const StyledTr = styled.tr`
  border: ${DEFAULT_DIVIDER_BORDER};
  padding: 16px;
`;
export const StyledTd = styled.td`
  border: ${DEFAULT_DIVIDER_BORDER};
  padding: 16px;
`;

export const StyledTdEmpty = styled(StyledTd).attrs({colSpan: '100%'})`
  text-align: center;
`;
