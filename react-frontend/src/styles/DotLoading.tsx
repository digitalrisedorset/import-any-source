import styled from 'styled-components';

export const DotLoading = styled.div`
    margin: 50px auto;
    text-align: center;
    width: 40px;

    /* HTML: <div class="loader"></div> */
    .loader {
        width: 32px;
        aspect-ratio: 1;
        --_g: no-repeat radial-gradient(farthest-side, #B5BDBC 90%, #0000);
        background: var(--_g), var(--_g), var(--_g), var(--_g);
        background-size: 40% 40%;
        animation: l46 1s infinite;
    }

    @keyframes l46 {
        0% {
            background-position: 0 0, 100% 0, 100% 100%, 0 100%
        }
        40%,
        50% {
            background-position: 100% 100%, 100% 0, 0 0, 0 100%
        }
        90%,
        100% {
            background-position: 100% 100%, 0 100%, 0 0, 100% 0
        }
    }
`;