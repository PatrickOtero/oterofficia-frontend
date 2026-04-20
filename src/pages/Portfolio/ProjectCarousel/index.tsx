import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectsApi } from "../../../features/projects/api/projectsApi";
import { ProjectRecord } from "../../../features/projects/types/project";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";
import { ProjectCarouselContainer } from "./Carousel.style";

const SOU_JUNIOR_OVERVIEW = {
  ctaLabel: "Conhecer a iniciativa",
  ctaUrl: "https://www.soujunior.tech/",
  description:
    "A SouJunior combina vivência prática, colaboração multidisciplinar e maturidade de produto em projetos reais. É um contexto valioso para mostrar responsabilidade, comunicação, constância e construção em equipe.",
  highlights: ["Experiência prática", "Times multidisciplinares", "Mentoria", "Projetos reais"],
  title: "Experiência colaborativa com impacto real",
};

const sectionCopy = {
  completed: {
    description:
      "Projetos entregues com proposta fechada, direção visual consistente e execução completa.",
    empty: "Ainda não há projetos concluídos publicados nesta seção.",
    id: "portfolio-concluidos",
    kicker: "Entregas finalizadas",
    title: "Concluídos",
  },
  inProgress: {
    description:
      "Frentes que continuam evoluindo por refinamento técnico, expansão funcional ou aprofundamento de produto.",
    empty: "Ainda não há projetos em progresso publicados aqui.",
    id: "portfolio-progresso",
    kicker: "Construção ativa",
    title: "Em progresso",
  },
  soujunior: {
    description:
      "Projetos construídos em contexto colaborativo na SouJunior, com atuação em equipe, alinhamento e entrega coletiva.",
    empty: "Ainda não há projetos da SouJunior exibidos aqui.",
    id: "portfolio-soujunior",
    kicker: "Experiência voluntária",
    title: "SouJunior",
  },
} as const;

const formatStatusLabel = (status: ProjectRecord["project_status"]) =>
  status === "completed" ? "Concluído" : "Em progresso";

const formatTrackLabel = (project: ProjectRecord) =>
  project.project_track === "soujunior" ? project.organization_name || "SouJunior" : "Autoral";

const normalizeParagraphs = (description: string) =>
  description
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const summarizeDescription = (description: string, maxLength = 180) => {
  const normalized = description.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 3)}...`;
};

const stopCardPropagation = (event: MouseEvent<HTMLAnchorElement>) => {
  event.stopPropagation();
};

const ProjectLinks = ({ project }: { project: ProjectRecord }) => {
  const links = [
    { href: project.frontend_url, label: "Front-end" },
    { href: project.backend_url, label: "Back-end" },
    { href: project.video_url, label: "Vídeo" },
  ].filter((item) => Boolean(item.href));

  if (!links.length) {
    return <span className="project-link-muted">Sem links públicos</span>;
  }

  return (
    <div className="project-link-list">
      {links.map((link) => (
        <a
          className="project-link-chip"
          href={link.href || undefined}
          key={`${project.id}-${link.label}`}
          onClick={stopCardPropagation}
          rel="noreferrer"
          target="_blank"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

type SectionKey = keyof typeof sectionCopy;

type PortfolioSectionProps = {
  projects: ProjectRecord[];
  section: SectionKey;
  selectedProjectId: number | null;
  onSelectProject: (project: ProjectRecord) => void;
};

const PortfolioSection = ({
  onSelectProject,
  projects,
  section,
  selectedProjectId,
}: PortfolioSectionProps) => {
  const copy = sectionCopy[section];

  return (
    <section className="portfolio-section" id={copy.id}>
      <div className="section-header">
        <div className="section-copy">
          <span className="section-kicker">{copy.kicker}</span>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <span className="section-count">{projects.length} projetos</span>
      </div>

      {projects.length ? (
        <div className="projects-grid">
          {projects.map((project) => {
            const isActive = selectedProjectId === project.id;

            return (
              <article
                className={`project-card ${isActive ? "project-card-active" : ""}`}
                key={`${section}-${project.id}`}
                onClick={() => onSelectProject(project)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectProject(project);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="project-card-media">
                  <img alt={project.project_name} loading="lazy" src={project.image_url} />
                </div>

                <div className="project-card-copy">
                  <div className="project-card-badges">
                    <span className="project-badge">{formatStatusLabel(project.project_status)}</span>
                    <span className="project-badge">{formatTrackLabel(project)}</span>
                  </div>

                  <div className="project-card-header">
                    <h3>{project.project_name}</h3>
                    {project.project_role ? (
                      <span className="project-card-role">{project.project_role}</span>
                    ) : null}
                  </div>

                  {project.project_highlight ? (
                    <p className="project-card-highlight">{project.project_highlight}</p>
                  ) : null}

                  <p className="project-card-description">
                    {summarizeDescription(project.project_desc)}
                  </p>

                  {project.project_tags.length ? (
                    <div className="project-tag-list">
                      {project.project_tags.map((tag) => (
                        <span className="project-tag" key={`${project.id}-${tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="project-card-footer">
                    <span className="project-card-hint">
                      {isActive ? "Projeto em foco" : "Selecionar projeto"}
                    </span>
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="portfolio-empty">{copy.empty}</div>
      )}
    </section>
  );
};

export const ProjectCarousel = () => {
  const navigate = useNavigate();
  const spotlightRef = useRef<HTMLElement | null>(null);
  const { portfolioPage } = useBotFunctionsContext();
  const { openPortfolioScene, showHomeMenu } = useBotSceneActions();
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!portfolioPage) {
      openPortfolioScene();
    }
  }, [openPortfolioScene, portfolioPage]);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await projectsApi.fetchProjects();
        setProjects([...response].sort((left, right) => right.id - left.id));
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Não foi possível carregar os projetos.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadProjects();
  }, []);

  const groupedProjects = useMemo(() => {
    const completed = projects.filter(
      (project) => project.project_track !== "soujunior" && project.project_status === "completed"
    );
    const inProgress = projects.filter(
      (project) => project.project_track !== "soujunior" && project.project_status === "in_progress"
    );
    const soujunior = projects.filter((project) => project.project_track === "soujunior");

    return { completed, inProgress, soujunior };
  }, [projects]);

  const featuredProject = useMemo(
    () =>
      groupedProjects.inProgress[0] ||
      groupedProjects.completed[0] ||
      groupedProjects.soujunior[0] ||
      null,
    [groupedProjects]
  );

  useEffect(() => {
    if (!projects.length) {
      setSelectedProject(null);
      return;
    }

    if (!selectedProject || !projects.some((project) => project.id === selectedProject.id)) {
      setSelectedProject(featuredProject);
    }
  }, [featuredProject, projects, selectedProject]);

  const metrics = useMemo(
    () => [
      { label: "Total", value: String(projects.length) },
      { label: "Concluídos", value: String(groupedProjects.completed.length) },
      { label: "Em progresso", value: String(groupedProjects.inProgress.length) },
      { label: "SouJunior", value: String(groupedProjects.soujunior.length) },
    ],
    [groupedProjects, projects.length]
  );

  const handleSelectProject = (project: ProjectRecord) => {
    setSelectedProject(project);

    if (window.innerWidth <= 980) {
      spotlightRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <ProjectCarouselContainer>
      <button
        className="portfolio-close-button"
        onClick={() => {
          showHomeMenu();
          navigate("/");
        }}
        type="button"
      >
        X
      </button>

      {isLoading ? (
        <FeedbackState description="Organizando a vitrine de projetos." title="Carregando portfólio" />
      ) : null}

      {!isLoading && errorMessage ? (
        <FeedbackState description={errorMessage} title="Falha ao carregar portfólio" variant="error" />
      ) : null}

      {!isLoading && !errorMessage ? (
        <>
          <section className="portfolio-hero">
            <div className="hero-copy">
              <span className="hero-eyebrow">Portfólio</span>
              <h1>Projetos com contexto, estética e leitura profissional.</h1>
              <p className="hero-description">
                Aqui eu organizo meus projetos por estágio de maturidade e por contexto de atuação.
                A ideia é mostrar não só interface, mas também consistência de construção, direção
                técnica e capacidade de colaborar em cenários diferentes.
              </p>

              <div className="hero-metrics">
                {metrics.map((metric) => (
                  <span className="hero-metric" key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </span>
                ))}
              </div>

              <div className="hero-actions">
                <a className="hero-action" href={`#${sectionCopy.completed.id}`}>
                  Concluídos
                </a>
                <a className="hero-action" href={`#${sectionCopy.inProgress.id}`}>
                  Em progresso
                </a>
                <a className="hero-action" href={`#${sectionCopy.soujunior.id}`}>
                  SouJunior
                </a>
              </div>
            </div>

            <div className="hero-side">
              <div className="hero-panel">
                <span className="section-kicker">Leitura rápida</span>
                <div className="hero-panel-grid">
                  {metrics.map((metric) => (
                    <div className="hero-panel-stat" key={`panel-${metric.label}`}>
                      <b>{metric.value}</b>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
                <p className="hero-note">
                  Cada projeto pode ser lido pelo estágio atual, pelo contexto em que foi construído
                  e pelo tipo de contribuição que ele representa.
                </p>
              </div>

              <div className="initiative-card initiative-card-compact">
                <div className="initiative-copy">
                  <strong>SouJunior</strong>
                  <h2>{SOU_JUNIOR_OVERVIEW.title}</h2>
                  <p>{SOU_JUNIOR_OVERVIEW.description}</p>
                  <div className="initiative-highlights">
                    {SOU_JUNIOR_OVERVIEW.highlights.map((highlight) => (
                      <span className="initiative-pill" key={highlight}>
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  className="initiative-link"
                  href={SOU_JUNIOR_OVERVIEW.ctaUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {SOU_JUNIOR_OVERVIEW.ctaLabel}
                </a>
              </div>
            </div>
          </section>

          {selectedProject ? (
            <section className="portfolio-spotlight" ref={spotlightRef}>
              <div className="spotlight-media">
                <img alt={selectedProject.project_name} src={selectedProject.image_url} />
              </div>

              <div className="spotlight-copy">
                <span className="section-kicker">Projeto em foco</span>

                <div className="spotlight-meta">
                  <span className="project-badge">{formatStatusLabel(selectedProject.project_status)}</span>
                  <span className="project-badge">{formatTrackLabel(selectedProject)}</span>
                  {selectedProject.project_role ? (
                    <span className="project-badge">{selectedProject.project_role}</span>
                  ) : null}
                </div>

                <h2>{selectedProject.project_name}</h2>
                {selectedProject.project_highlight ? (
                  <p className="spotlight-highlight">{selectedProject.project_highlight}</p>
                ) : null}

                <div className="spotlight-description">
                  {normalizeParagraphs(selectedProject.project_desc).map((paragraph, index) => (
                    <p key={`${selectedProject.id}-paragraph-${index}`}>{paragraph}</p>
                  ))}
                </div>

                {selectedProject.project_tags.length ? (
                  <div className="project-tag-list">
                    {selectedProject.project_tags.map((tag) => (
                      <span className="project-tag" key={`spotlight-${selectedProject.id}-${tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <ProjectLinks project={selectedProject} />
              </div>
            </section>
          ) : null}

          <PortfolioSection
            onSelectProject={handleSelectProject}
            projects={groupedProjects.completed}
            section="completed"
            selectedProjectId={selectedProject?.id || null}
          />

          <PortfolioSection
            onSelectProject={handleSelectProject}
            projects={groupedProjects.inProgress}
            section="inProgress"
            selectedProjectId={selectedProject?.id || null}
          />

          <section className="initiative-card" id={sectionCopy.soujunior.id}>
            <div className="initiative-copy">
              <strong>SouJunior</strong>
              <h2>{SOU_JUNIOR_OVERVIEW.title}</h2>
              <p>{SOU_JUNIOR_OVERVIEW.description}</p>
              <div className="initiative-highlights">
                {SOU_JUNIOR_OVERVIEW.highlights.map((highlight) => (
                  <span className="initiative-pill" key={`initiative-${highlight}`}>
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="initiative-side">
              <p className="initiative-note">
                Quando um projeto nasce nesse contexto, ele revela leitura de time, adaptação e
                capacidade de construir junto.
              </p>
              <a
                className="initiative-link"
                href={SOU_JUNIOR_OVERVIEW.ctaUrl}
                rel="noreferrer"
                target="_blank"
              >
                {SOU_JUNIOR_OVERVIEW.ctaLabel}
              </a>
            </div>
          </section>

          <PortfolioSection
            onSelectProject={handleSelectProject}
            projects={groupedProjects.soujunior}
            section="soujunior"
            selectedProjectId={selectedProject?.id || null}
          />

          {!projects.length ? (
            <div className="portfolio-empty">
              Nenhum projeto foi cadastrado ainda. Assim que você adicionar projetos no painel, esta
              vitrine passa a organizar tudo automaticamente.
            </div>
          ) : null}
        </>
      ) : null}
    </ProjectCarouselContainer>
  );
};
