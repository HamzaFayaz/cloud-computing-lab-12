import './App.css';

// GCS_ASSET_URL: resume, project images - to be linked in Part 3
// const RESUME_PDF_URL = 'https://storage.googleapis.com/<bucket>/resume.pdf';
// const PROJECT_IMAGE_URLS = {
//   medcall: 'https://storage.googleapis.com/<bucket>/medcall.png',
//   rag: 'https://storage.googleapis.com/<bucket>/rag.png',
//   aimbot: 'https://storage.googleapis.com/<bucket>/aimbot.png',
// };

const STUDENT = {
  name: 'Hamza Fayaz',
  registration: '22MDSWE227',
  course: 'Cloud Computing',
};

const PROJECTS = [
  {
    id: 'medcall',
    title: 'MedCall-AI',
    description:
      'Healthcare patient scheduler and intake voice agent built for Mercy General. An AI receptionist handles appointment booking, patient authentication, FAQ responses, and call routing through natural voice interaction—with emergency guardrails and RAG-backed answers from clinic documentation.',
    tech: ['WebRTC', 'Deepgram', 'LangGraph', 'FastAPI', 'Supabase', 'pgvector'],
    github: 'https://github.com/HamzaFayaz/MedCall-AI',
  },
  {
    id: 'rag',
    title: 'Agentic RAG Sub-Agents',
    description:
      'Production-grade retrieval-augmented generation application with threaded chat and document ingestion. Supports drag-and-drop uploads, hybrid vector + full-text search, Cohere reranking, and SSE-streamed responses with inline source citations.',
    tech: ['React 19', 'TypeScript', 'FastAPI', 'Supabase', 'pgvector', 'Cohere'],
    github: 'https://github.com/HamzaFayaz/agentic-rag-sub-agents',
  },
  {
    id: 'aimbot',
    title: 'Project IGI — AimBot Computer Vision',
    description:
      'Real-time AI object detection and tracking system delivering 60+ FPS performance. Built on a custom-trained YOLO v10 model with ByteTrack multi-object tracking, CUDA acceleration, and a modular Tkinter GUI for live monitoring.',
    tech: ['YOLO v10', 'ByteTrack', 'OpenCV', 'Tkinter', 'CUDA'],
    github: 'https://github.com/HamzaFayaz/project-igi-aimbot-computervision',
  },
];

function App() {
  return (
    <div className="app">
      <header className="hero">
        <nav className="nav">
          <span className="nav-logo">HF</span>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="hero-eyebrow">Cloud Computing Portfolio</p>
          <h1 className="hero-title">{STUDENT.name}</h1>
          <p className="hero-subtitle">
            Software engineering student building intelligent systems at the
            intersection of cloud infrastructure, AI agents, and real-time
            applications.
          </p>
          <div className="hero-meta">
            <span className="meta-badge">{STUDENT.registration}</span>
            <span className="meta-badge">{STUDENT.course}</span>
          </div>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            {/* GCS_ASSET_URL: resume PDF link — enable after Part 3 bucket setup */}
            <a href="#about" className="btn btn-secondary">
              About Me
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section about">
          <div className="container">
            <h2 className="section-title">About</h2>
            <div className="about-grid">
              <div className="about-card">
                <h3>Student Information</h3>
                <dl className="info-list">
                  <div className="info-row">
                    <dt>Name</dt>
                    <dd>{STUDENT.name}</dd>
                  </div>
                  <div className="info-row">
                    <dt>Registration</dt>
                    <dd>{STUDENT.registration}</dd>
                  </div>
                  <div className="info-row">
                    <dt>Course</dt>
                    <dd>{STUDENT.course}</dd>
                  </div>
                </dl>
              </div>
              <div className="about-card">
                <h3>Focus Areas</h3>
                <p>
                  I specialize in deploying production-ready AI applications on
                  cloud platforms—combining voice agents, retrieval-augmented
                  generation pipelines, and GPU-accelerated computer vision with
                  modern full-stack engineering practices.
                </p>
                <p>
                  This portfolio is hosted as part of the SE-409L Cloud
                  Computing lab, demonstrating scalable web deployment on Google
                  Cloud Platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section projects">
          <div className="container">
            <h2 className="section-title">Projects</h2>
            <p className="section-lead">
              Selected work spanning healthcare AI, production RAG systems, and
              real-time computer vision.
            </p>
            <div className="projects-grid">
              {PROJECTS.map((project) => (
                <article key={project.id} className="project-card">
                  {/* GCS_ASSET_URL: project thumbnail — PROJECT_IMAGE_URLS[project.id] */}
                  <div className="project-card-header">
                    <h3>{project.title}</h3>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="tech-tags">
                    {project.tech.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub &rarr;
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            &copy; {new Date().getFullYear()} {STUDENT.name} &mdash;{' '}
            {STUDENT.course} OEL Portfolio
          </p>
          <p className="footer-meta">
            {STUDENT.registration} &middot; Hosted on Google Cloud Platform
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
