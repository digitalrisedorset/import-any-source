import styled from "styled-components";


export const Table = styled.table`
    font-size: small;
    border-collapse:collapse;
    
    th {
        text-transform: uppercase;
        vertical-align: top;
        border: 1px solid var(--lightGrey);
        padding: 2px 5px;
    }
    td {
        vertical-align: top;
        border: 1px solid var(--lightGrey);
        padding: 2px 5px;
    }
    th.small,
    td.small {
        width: 60px;
    }
    th.medium,
    td.medium {
        width: 150px;
    }
    td.truncated {
        width: 300px;
    }
`
