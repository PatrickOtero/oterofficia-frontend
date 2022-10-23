import styled from "styled-components";

export const TurbineContainer = styled("div")`
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
                    transform: translateZ(0) translateX(-15rem);
                }
                50% {
                    transform: translateZ(0) translateX(15rem);
                }
                50.01% {
                    transform: translateZ(-0.1rem) translateX(15rem);
                }
                to {
                    transform: translateZ(-0.1rem) translateX(-15rem);
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
            
        transform-style: preserve-3d;

      .turbine-container-zindex {
          position: absolute;
          animation: turbineRotationZ 3s infinite forwards;

          right: -0.8rem;
      
          transform: translateZ(0);
        }
    
        .turbine-container-xindex {
            position: relative;

            display: flex;
            justify-content: center;
            align-items: center;

          animation: turbineRotationX 3s ease-in-out infinite forwards;
      
          transform: translateZ(0) translateX(-19rem);
          width: 6rem;
          height: 6rem;
      
          border-radius: 15rem 15rem 0 0;
          background: linear-gradient(#474646 0%, #353434 10%, #242323 50%, #000000 100%);
        }

        .turbine-3d-container {
            display: flex;
            justify-content: center;

            width: 4rem;
            height: 4rem;

            border-radius: 15rem 15rem 0 0;
            background: linear-gradient(#646262 0%, #383737 10%, #2c2b2b 50%, #000000 100%);

            filter: blur(1rem);
        }

        .turbine-shuttle {
            position: absolute;

            animation: turbineShuttle 50ms infinite;

            background-color: #29a1b6ff;
            box-shadow: 0 0 10px 10px #29a1b6ff;

            top: 7rem;

            border-radius: 0 0 2rem 2rem;
            width: 1rem;
            height: 3rem;
        }    
`