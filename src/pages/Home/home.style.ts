import { Box } from "@mui/system";
import styled from "styled-components";

export const HomeContainer = styled(Box)`
    min-width: 100vw;
    min-height: 100vh;

    display: flex;

    transform-style: preserve-3d;

    justify-content: center;
    align-items: center; 

      .turbines-container {
        perspective: 1000px;
        transform-style: preserve-3d;

        @keyframes turbineShuttle {
                from {
                    opacity: 0;
                    height: 0.1rem;
                }
                to {
                    opacity: 1;
                    height: 4rem ;
                }
            }

            @keyframes turbineRotationX {
                from {
                    transform: translateZ(0) translateX(-19rem);
                }
                50% {
                    transform: translateZ(0) translateX(19rem);
                }
                50.01% {
                    transform: translateZ(-0.1rem) translateX(19rem);
                }
                to {
                    transform: translateZ(-0.1rem) translateX(-19rem);
                }
            }

            @keyframes turbineRotationZ {
                from {
                    transform: translateZ(0)
                } 
                25% {
                    transform: translateZ(5rem)
                }
                75% {
                    transform: translateZ(-5rem)
                }
                100% {
                    transform: translateZ(0);
                }
            }

            position: absolute;

            top: 18rem;
            left: 15rem;
      }
`