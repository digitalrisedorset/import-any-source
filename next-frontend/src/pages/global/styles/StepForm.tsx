import styled from "styled-components";

export const StepForm = styled.form`
    display: flex;

    .main {
        border: 1px solid var(--offWhite);
        box-shadow: var(--bs);
        margin: 1rem 1rem 1rem 0;
        padding: 0 1rem;
        width: 100%;
    }
    .board {
        display: flex;
        margin: 1rem 0 1rem 0;
        padding: 0 1rem 0 0;
        width: 100%;
    }

    button {
        float: left;
        margin: 10px 10px 10px 0;

        &[disabled] {
            opacity: 0.5;
        }
    }
`;

export const MonitoringNotification  = styled.form`
    display: flex;
    margin: 1rem;
    padding: 0 1rem;
    width: 30%;
`;

export const NotificationMessage = styled.form`
    font-weight: lighter;
    color: #282c34;
`;


