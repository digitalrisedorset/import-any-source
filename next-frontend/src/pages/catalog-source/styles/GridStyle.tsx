import styled from "styled-components";

export const GridReport = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    .main {
        margin: 0.5rem 0.5rem 0 0;
        padding: 1.5rem;
        border: 2px solid black;
        box-shadow: 2px 2px 10px black;
        width: 80%;
    }
    .delete {
        margin: 0.5rem;
        padding: 1.5rem;
        border: 2px solid black;
        box-shadow: 2px 2px 10px black;
        width: 15%;
    }
`

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
    td.price {
        text-align: center;
    }
    tr.valid {
        background: var(--valid);
    }
    tr.not_needed {
        background:  var(--invalid);
    }
    tr.updated {
        background:  var(--updated);
    }
    tr.deleted {
        background:  var(--deleted);
    }
    button {
        font-size: small;
        margin: 0;
        padding: 5px;
    }
`
