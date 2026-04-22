import styled from "styled-components";

export const NotificationCenterPortalContainer = styled.div`
    position: fixed;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(1rem, 2.8vw, 2.4rem);
    background: rgba(3, 10, 16, 0.74);
    backdrop-filter: blur(10px);

    .notification-center-shell {
        width: min(74rem, 100%);
        min-height: min(34rem, calc(100vh - 2rem));
        max-height: calc(100vh - 2rem);
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        padding: 1.3rem;
        border: 1px solid rgba(112, 204, 255, 0.18);
        border-radius: 2.2rem;
        background: linear-gradient(180deg, rgba(8, 21, 34, 0.96) 0%, rgba(6, 15, 25, 0.94) 100%);
        box-shadow:
            0 1.6rem 3.8rem rgba(0, 0, 0, 0.34),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        overflow: hidden;
    }

    .notification-center-header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 1rem;
        align-items: start;
    }

    .notification-title-group {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
    }

    .notification-title-group strong {
        color: rgba(236, 248, 255, 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.42rem;
        letter-spacing: 0.08em;
        line-height: 1.2;
        text-transform: uppercase;
    }

    .notification-title-group span {
        color: rgba(171, 220, 242, 0.74);
        font-size: 1rem;
        line-height: 1.5;
    }

    .notification-center-actions {
        display: inline-flex;
        align-items: center;
        gap: 0.8rem;
    }

    .notification-mark-all,
    .notification-close {
        min-width: 0;
        border: 1px solid rgba(115, 206, 255, 0.16);
        background: rgba(10, 28, 42, 0.8);
        color: rgba(222, 245, 255, 0.92);
    }

    .notification-mark-all {
        height: 3.6rem;
        padding: 0 1.25rem;
        border-radius: 1.1rem;
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.86rem;
        letter-spacing: 0.06em;
        touch-action: manipulation;
        text-transform: uppercase;
    }

    .notification-close {
        width: 3.8rem;
        height: 3.8rem;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        touch-action: manipulation;
    }

    .notification-center-list {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.95rem;
        overflow: auto;
        padding-right: 0.45rem;
        align-content: start;
    }

    .notification-center-list::-webkit-scrollbar {
        width: 0.7rem;
    }

    .notification-center-list::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background: rgba(103, 194, 255, 0.28);
    }

    .notification-item {
        width: 100%;
        min-width: 0;
        height: auto;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 1rem;
        align-items: start;
        padding: 1.05rem 1.15rem;
        border-radius: 1.55rem;
        border: 1px solid rgba(110, 198, 255, 0.12);
        background: linear-gradient(180deg, rgba(14, 31, 46, 0.82) 0%, rgba(10, 18, 28, 0.86) 100%);
        text-align: left;
        appearance: none;
        touch-action: manipulation;
        transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        white-space: normal;
    }

    .notification-item[data-unread="true"] {
        border-color: rgba(116, 214, 255, 0.28);
        box-shadow: inset 0 0 0 1px rgba(116, 214, 255, 0.06);
    }

    .notification-item:hover {
        transform: translateY(-0.12rem);
        border-color: rgba(116, 214, 255, 0.24);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.16);
    }

    .notification-avatar {
        width: 4rem;
        height: 4rem;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid rgba(116, 212, 255, 0.22);
        background:
            radial-gradient(circle at 30% 28%, rgba(219, 246, 255, 0.22), transparent 28%),
            linear-gradient(180deg, rgba(41, 84, 130, 0.8) 0%, rgba(10, 25, 40, 0.92) 100%);
        color: rgba(231, 248, 255, 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.1rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        overflow: hidden;
    }

    .notification-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .notification-copy {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
    }

    .notification-copy-header {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .notification-copy-title {
        margin: 0;
        min-width: 0;
        color: rgba(236, 248, 255, 0.96);
        font-size: 1.05rem;
        line-height: 1.45;
        overflow-wrap: anywhere;
    }

    .notification-copy-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
    }

    .notification-chip,
    .notification-time {
        display: inline-flex;
        align-items: center;
        padding: 0.3rem 0.68rem;
        border-radius: 999px;
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.78rem;
        letter-spacing: 0.08em;
        line-height: 1.2;
        text-transform: uppercase;
    }

    .notification-chip {
        border: 1px solid rgba(111, 205, 255, 0.14);
        background: rgba(111, 205, 255, 0.08);
        color: rgba(186, 231, 255, 0.88);
    }

    .notification-time {
        color: rgba(170, 220, 242, 0.58);
        background: rgba(255, 255, 255, 0.02);
    }

    .notification-copy-body {
        display: block;
        margin: 0;
        min-width: 0;
        max-width: 100%;
        color: rgba(188, 225, 242, 0.8);
        font-size: 0.97rem;
        line-height: 1.62;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
    }

    .notification-empty {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        align-items: center;
        justify-content: center;
        min-height: 20rem;
        padding: 2rem;
        border-radius: 2rem;
        border: 1px dashed rgba(110, 198, 255, 0.18);
        color: rgba(188, 225, 242, 0.72);
        text-align: center;
    }

    @media (max-width: 900px) {
        .notification-center-shell {
            min-height: calc(100vh - 2rem);
            padding: 1.1rem;
        }

        .notification-center-header {
            grid-template-columns: 1fr;
        }

        .notification-center-actions {
            justify-content: space-between;
        }

        .notification-item {
            grid-template-columns: auto minmax(0, 1fr);
            padding: 1rem;
        }
    }

    @media (max-width: 640px) {
        padding: 0.8rem;

        .notification-title-group strong {
            font-size: 1.18rem;
        }

        .notification-title-group span {
            font-size: 0.92rem;
        }

        .notification-mark-all {
            flex: 1;
            font-size: 0.76rem;
        }

        .notification-item {
            gap: 0.85rem;
        }

        .notification-avatar {
            width: 3.35rem;
            height: 3.35rem;
            font-size: 0.92rem;
        }

        .notification-copy-title {
            font-size: 0.94rem;
        }

        .notification-copy-body {
            font-size: 0.88rem;
        }
    }
`;
