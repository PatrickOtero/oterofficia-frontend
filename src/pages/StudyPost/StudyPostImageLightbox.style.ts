import styled from "styled-components";

export const StudyPostImageLightboxContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: rgba(3, 8, 14, 0.88);
  backdrop-filter: blur(6px);

  .image-lightbox-shell {
    position: relative;
    width: min(118rem, 100%);
    max-height: calc(100vh - 6rem);
    padding: 1.4rem;
    border-radius: 2.4rem;
    border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
    background: rgba(7, 16, 25, 0.9);
    box-shadow: 0 1.8rem 4rem rgba(0, 0, 0, 0.34);
  }

  .image-lightbox-close {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    z-index: 1;
    width: 4.2rem;
    min-width: 0;
    height: 4.2rem;
    padding: 0;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .image-lightbox-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  img {
    width: 100%;
    max-height: calc(100vh - 14rem);
    object-fit: contain;
    border-radius: 1.6rem;
    background: rgba(2, 8, 12, 0.94);
  }

  .image-lightbox-caption {
    color: rgba(var(--scene-accent-soft-rgb), 0.8);
    font-size: 1.35rem;
    line-height: 1.7;
    text-align: center;
  }

  @media (max-width: 900px) {
    padding: 1.6rem;

    .image-lightbox-shell {
      max-height: calc(100vh - 3.2rem);
    }
  }
`;
