import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiExternalLink,
  FiX,
  FiArrowUpRight,
  FiCheck,
  FiCalendar,
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { SectionHeading } from "../About/SectionHeading";

type Certificate = {
  title: string;
  issuer: string;
  category: string;
  featured?: boolean;
  year?: string;
  url?: string;
  description?: string;
};

type SortKey = "newest" | "oldest" | "title" | "issuer";

const PAGE_SIZE = 6;

const certs: Certificate[] = [
  {
    title: "AI/ML Engineer — Stage 2",
    issuer: "SLIIT",
    category: "Artificial Intelligence",
    featured: true,
    year: "2026",
    description:
      "Advanced machine learning architectures, model deployment, and AI system design.",
    url: "https://code.sliit.org/certificates/mtcwf3j3li",
  },
  {
    title: "AI/ML Engineer — Stage 1",
    issuer: "SLIIT",
    category: "Artificial Intelligence",
    featured: true,
    year: "2024",
    description:
      "Foundations of supervised and unsupervised learning, neural networks, and data pipelines.",
    url: "https://code.sliit.org/certificates/nlodb1b4bg",
  },
  {
    title: "Frontend Web Development",
    issuer: "University of Moratuwa",
    category: "Frontend Engineering",
    year: "2023",
    description:
      "Modern HTML/CSS/JS techniques, responsive layouts, and performance optimisation.",
    url: "https://open.uom.lk/lms/certificates/verify/FWD-2023-XXXX",
  },
  {
    title: "Online Learning Programme in Python",
    issuer: "University of Moratuwa",
    category: "Programming",
    year: "2023",
    description:
      "Intermediate Python programming including data structures and OOP patterns.",
    url: "https://open.uom.lk/lms/certificates/verify/PY-2023-XXXX",
  },
  {
    title: "Web Design Programme",
    issuer: "University of Moratuwa",
    category: "UI / UX",
    year: "2023",
    description:
      "Principles of visual hierarchy, typography, and user-centred interface design.",
    url: "https://open.uom.lk/lms/certificates/verify/WDP-2023-XXXX",
  },
  {
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    category: "Programming",
    year: "2022",
    description:
      "Core Python syntax, control flow, and introductory scripting.",
    url: "https://open.uom.lk/lms/certificates/verify/PYB-2022-XXXX",
  },
  {
    title: "Software Engineer Intern",
    issuer: "HackerRank",
    category: "Software Engineering",
    year: "2022",
    description:
      "Problem-solving certification covering algorithms and data structures.",
    url: "https://www.hackerrank.com/certificates/XXXXXXXXXXXX",
  },
  {
    title: "Java Course",
    issuer: "Sololearn",
    category: "Backend Development",
    year: "2022",
    description:
      "Object-oriented Java fundamentals, collections, and exception handling.",
    url: "https://www.sololearn.com/certificates/CT-XXXXXXXXXXXX",
  },
  {
    title: "HTML Course",
    issuer: "Sololearn",
    category: "Web Fundamentals",
    year: "2021",
    description:
      "Semantic markup, accessibility basics, and document structure.",
    url: "https://www.sololearn.com/certificates/CT-YYYYYYYYYYYY",
  },
  {
    title: "Google Analytics for Beginners",
    issuer: "Google Analytics Academy",
    category: "Analytics",
    year: "2021",
    description:
      "Traffic analysis, goal tracking, and data-driven decision making.",
    url: "https://analytics.google.com/analytics/academy/certificate/XXXXXXXXXXXX",
  },
];

const categoryStyles: Record<
  string,
  { accent: string; soft: string; code: string }
> = {
  "Artificial Intelligence": {
    accent: "#8B9CFF",
    soft: "rgba(139,156,255,.10)",
    code: "AI",
  },
  "Frontend Engineering": {
    accent: "#62D6FF",
    soft: "rgba(98,214,255,.10)",
    code: "FE",
  },
  "UI / UX": {
    accent: "#A78BFA",
    soft: "rgba(167,139,250,.10)",
    code: "UX",
  },
  Programming: {
    accent: "#7DD3FC",
    soft: "rgba(125,211,252,.10)",
    code: "PY",
  },
  "Backend Development": {
    accent: "#60A5FA",
    soft: "rgba(96,165,250,.10)",
    code: "BE",
  },
  "Software Engineering": {
    accent: "#C4B5FD",
    soft: "rgba(196,181,253,.10)",
    code: "SE",
  },
  "Web Fundamentals": {
    accent: "#BAE6FD",
    soft: "rgba(186,230,253,.08)",
    code: "WF",
  },
  Analytics: {
    accent: "#67E8F9",
    soft: "rgba(103,232,249,.10)",
    code: "AN",
  },
};

const getStyle = (category: string) =>
  categoryStyles[category] ?? {
    accent: "#A5B4FC",
    soft: "rgba(165,180,252,.08)",
    code: "CR",
  };

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Title A–Z" },
  { value: "issuer", label: "Issuer A–Z" },
];

function sortCertificates(list: Certificate[], sortBy: SortKey) {
  const sorted = [...list];
  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) => Number(b.year ?? 0) - Number(a.year ?? 0)
      );
    case "oldest":
      return sorted.sort(
        (a, b) => Number(a.year ?? 0) - Number(b.year ?? 0)
      );
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "issuer":
      return sorted.sort((a, b) => a.issuer.localeCompare(b.issuer));
    default:
      return sorted;
  }
}

function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!cert) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#03050a]/80 p-4 backdrop-blur-xl sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0d14] shadow-[0_30px_100px_rgba(0,0,0,.55)]"
          >
            {(() => {
              const style = getStyle(cert.category);

              return (
                <>
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${style.accent}, transparent)`,
                    }}
                  />

                  <div className="absolute right-0 top-0 h-64 w-64 rounded-full blur-[100px]"
                    style={{ background: `${style.accent}10` }}
                  />

                  <div className="relative p-6 sm:p-10">
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close certificate details"
                      className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/35 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                    >
                      <FiX size={17} />
                    </button>

                    <div className="mb-10 flex items-start justify-between gap-6 pr-12">
                      <div>
                        <div
                          className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                          style={{
                            color: style.accent,
                            borderColor: `${style.accent}35`,
                            background: style.soft,
                          }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
                            {cert.category}
                          </span>
                        </div>

                        <h3 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                          {cert.title}
                        </h3>
                      </div>

                      <div
                        className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border sm:flex"
                        style={{
                          color: style.accent,
                          borderColor: `${style.accent}25`,
                          background: style.soft,
                        }}
                      >
                        <FiAward size={25} />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                          Issuer
                        </p>
                        <p className="text-sm text-white/75">{cert.issuer}</p>
                      </div>

                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                          Issued
                        </p>
                        <p className="flex items-center gap-2 text-sm text-white/75">
                          <FiCalendar size={13} />
                          {cert.year ?? "—"}
                        </p>
                      </div>
                    </div>

                    {cert.description && (
                      <p className="mt-6 max-w-xl text-sm leading-7 text-white/45">
                        {cert.description}
                      </p>
                    )}

                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-3 rounded-xl border px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] transition hover:-translate-y-0.5"
                        style={{
                          color: style.accent,
                          borderColor: `${style.accent}35`,
                          background: style.soft,
                        }}
                      >
                        Verify credential
                        <FiExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CertificateCard({
  cert,
  index,
  onSelect,
}: {
  cert: Certificate;
  index: number;
  onSelect: () => void;
}) {
  const style = getStyle(cert.category);

  return (
    <motion.button
      type="button"
      layout="position"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.985 }}
      onClick={onSelect}
      className="group relative w-full overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#0a0c12] text-left shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:border-white/[0.16] hover:bg-[#0d1018] hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,.65)]"
    >
      {/* Number */}
      <span className="absolute right-5 top-5 font-mono text-[9px] text-white/15 transition-colors duration-300 group-hover:text-white/30">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: style.accent }}
      />

      {/* Diagonal sheen sweep on hover */}
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100"
        style={{
          background: `linear-gradient(115deg, transparent 40%, ${style.accent}14 50%, transparent 60%)`,
        }}
      />

      <div className="relative p-6">
        <div className="mb-9 flex items-center justify-between">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
            style={{
              color: style.accent,
              borderColor: `${style.accent}25`,
              background: style.soft,
            }}
          >
            <span className="font-mono text-[10px] font-medium">
              {style.code}
            </span>
          </div>

          {cert.featured ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.15em]"
              style={{
                color: style.accent,
                borderColor: `${style.accent}25`,
                background: style.soft,
              }}
            >
              <span className="h-1 w-1 rounded-full bg-current" />
              Featured
            </span>
          ) : (
            <span className="font-mono text-[9px] text-white/25">
              {cert.year}
            </span>
          )}
        </div>

        <p
          className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em]"
          style={{ color: style.accent }}
        >
          {cert.category}
        </p>

        <h3 className="min-h-[4rem] max-w-[270px] text-[19px] font-medium leading-[1.2] tracking-[-0.025em] text-white/90">
          {cert.title}
        </h3>

        <div className="mt-7 flex items-end justify-between border-t border-white/[0.06] pt-5">
          <div>
            <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.15em] text-white/20">
              Issued by
            </p>
            <p className="text-xs text-white/40">{cert.issuer}</p>
          </div>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-white/20 group-hover:text-white/80">
            <FiArrowUpRight size={14} />
          </span>
        </div>

        <div
          className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: style.accent }}
        />
      </div>
    </motion.button>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center rounded-[22px] border border-dashed border-white/10 bg-white/[0.015] px-6 py-16 text-center"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/25">
        <FiSearch size={18} />
      </div>
      <p className="text-sm text-white/50">No credentials match your filters.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-full border border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/40 transition hover:border-white/20 hover:text-white/80"
      >
        Clear filters
      </button>
    </motion.div>
  );
}

const Certificates = () => {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = useCallback((cert: Certificate) => {
    setSelected(cert);
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(certs.map((cert) => cert.category)))],
    []
  );

  const institutionCount = useMemo(
    () => new Set(certs.map((cert) => cert.issuer)).size,
    []
  );
  const featuredCount = useMemo(
    () => certs.filter((cert) => cert.featured).length,
    []
  );
  const featuredCert = useMemo(
    () => certs.find((cert) => cert.featured) ?? null,
    []
  );

  // Filter (category + search) then sort — recomputed only when an input changes.
  const filteredSorted = useMemo(() => {
    const query = search.trim().toLowerCase();

    const byCategory =
      activeCategory === "All"
        ? certs
        : certs.filter((cert) => cert.category === activeCategory);

    const bySearch = query
      ? byCategory.filter(
          (cert) =>
            cert.title.toLowerCase().includes(query) ||
            cert.issuer.toLowerCase().includes(query) ||
            cert.category.toLowerCase().includes(query)
        )
      : byCategory;

    return sortCertificates(bySearch, sortBy);
  }, [activeCategory, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE));

  // Keep the current page in range whenever the filtered set changes size.
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredSorted.slice(start, start + PAGE_SIZE);
  }, [filteredSorted, page]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((value: SortKey) => {
    setSortBy(value);
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setActiveCategory("All");
    setSearch("");
    setSortBy("newest");
    setPage(1);
  }, []);

  const goToPage = useCallback(
    (next: number) => {
      const clamped = Math.max(1, Math.min(totalPages, next));
      setPage(clamped);
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [totalPages]
  );

  const rangeStart = filteredSorted.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, filteredSorted.length);

  return (
    <section
      id="certificates"
      className="relative overflow-hidden bg-[#07080d] py-24 text-foreground sm:py-32"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-15%] top-[20%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12%] bottom-[5%] h-[450px] w-[450px] rounded-full bg-cyan-400/[0.045] blur-[150px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Certifications"
          title={
            <>
              Proof of <span className="text-primary">progress.</span>
            </>
          }
          description="A curated record of technical learning across AI, software engineering, programming, design, and analytics."
        />

        {/* Featured certificate */}
        {featuredCert && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            onClick={() => setSelected(featuredCert)}
            className="group relative mb-6 w-full overflow-hidden rounded-[26px] border border-primary/15 bg-primary/[0.045] text-left transition-all duration-500 hover:border-primary/30 hover:bg-primary/[0.065]"
          >
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/[0.08] to-transparent" />

            <div className="relative grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                <FiAward size={25} />
              </div>

              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                    Latest featured credential
                  </span>
                  <span className="h-1 w-1 rounded-full bg-primary/50" />
                  <span className="font-mono text-[9px] text-white/25">
                    {featuredCert.year}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">
                  {featuredCert.title}
                </h3>
                <p className="mt-1 text-sm text-white/35">
                  {featuredCert.issuer} · {featuredCert.category}
                </p>
              </div>

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/35 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-primary/30 group-hover:text-primary">
                <FiArrowUpRight size={17} />
              </span>
            </div>
          </motion.button>
        )}

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="border-r border-white/[0.07] p-4 sm:p-5">
            <p className="font-mono text-xl text-white sm:text-2xl">
              {certs.length}
            </p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/25 sm:text-[9px]">
              Credentials
            </p>
          </div>

          <div className="border-r border-white/[0.07] p-4 sm:p-5">
            <p className="font-mono text-xl text-white sm:text-2xl">
              {institutionCount}
            </p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/25 sm:text-[9px]">
              Institutions
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <p className="font-mono text-xl text-white sm:text-2xl">
              {featuredCount}
            </p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/25 sm:text-[9px]">
              Featured
            </p>
          </div>
        </div>

        {/* Search + Sort */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <FiSearch
              size={14}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search by title, issuer, or category…"
              className="w-full rounded-full border border-white/[0.07] bg-white/[0.02] py-2.5 pl-10 pr-9 text-sm text-white/80 placeholder:text-white/20 outline-none transition focus:border-primary/30 focus:bg-white/[0.035]"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 transition hover:text-white/70"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(event) => handleSortChange(event.target.value as SortKey)}
              className="w-full appearance-none rounded-full border border-white/[0.07] bg-white/[0.02] py-2.5 pl-4 pr-9 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60 outline-none transition focus:border-primary/30 sm:w-auto"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#0a0c12] text-white">
                  {option.label}
                </option>
              ))}
            </select>
            <FiChevronDown
              size={13}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25"
            />
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-7 flex items-center justify-between gap-5">
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => {
              const active = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.13em] transition-all ${
                    active
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-white/[0.07] bg-white/[0.02] text-white/30 hover:border-white/15 hover:text-white/65"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <span className="hidden shrink-0 font-mono text-[9px] text-white/20 sm:block">
            {filteredSorted.length === 0
              ? "0 shown"
              : `${rangeStart}–${rangeEnd} of ${filteredSorted.length}`}
          </span>
        </div>

        {/* Cards */}
        <motion.div
          ref={gridRef}
          layout
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {paginated.length > 0 ? (
              paginated.map((cert, index) => (
                <CertificateCard
                  key={cert.title}
                  cert={cert}
                  index={index}
                  onSelect={() => handleSelect(cert)}
                />
              ))
            ) : (
              <EmptyState key="empty" onReset={resetFilters} />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/40 transition hover:border-white/20 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-white/[0.08] disabled:hover:text-white/40"
            >
              <FiChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => goToPage(n)}
                aria-current={n === page ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[10px] transition ${
                  n === page
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-white/[0.07] text-white/35 hover:border-white/20 hover:text-white/75"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/40 transition hover:border-white/20 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-white/[0.08] disabled:hover:text-white/40"
            >
              <FiChevronRight size={15} />
            </button>
          </div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2">
            <FiCheck size={13} className="text-primary" />
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/25">
              Continuous professional development
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/20">
            Click any credential for details
          </span>
        </motion.div>
      </div>

      <CertificateModal
        cert={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};

export default Certificates;