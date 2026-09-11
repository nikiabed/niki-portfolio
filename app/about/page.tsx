import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#1b1b1b] text-[#f1f1ed]">
      <div className="mx-auto w-[90%] max-w-[1300px] py-10 mobile:py-16">
        {/* HEADER */}
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/"
            className="
              text-[0.7rem]
              uppercase
              tracking-[0.22em]
              text-white/50
              transition-colors
              hover:text-white
            "
          >
            Niki Abedzadeh
          </Link>

          <Link
            href="/"
            className="
              text-[0.7rem]
              uppercase
              tracking-[0.18em]
              text-white/40
              transition-colors
              hover:text-white
            "
          >
            Back to map ↗
          </Link>
        </header>

        {/* HERO */}
        {/* HERO */}
        <section
          className="
    grid
    min-h-[82vh]
    items-center
    gap-10
    py-14

    mobile:grid-cols-[0.75fr_0.9fr_1fr]
    mobile:gap-12
    mobile:py-20
  "
        >
          {/* TITLE */}
          <div className="self-center">
            <p
              className="
        mb-5
        text-[0.68rem]
        uppercase
        tracking-[0.25em]
        text-white/35
      "
            >
              About / 01
            </p>

            <h1
              className="
        max-w-[500px]
        text-[clamp(3.2rem,6vw,6.5rem)]
        font-light
        leading-[0.88]
        tracking-[-0.06em]
      "
            >
              Cities,
              <br />
              data &
              <br />
              technology.
            </h1>
          </div>

          {/* PORTRAIT */}
          <div
            className="
      group
      relative
      mx-auto
      w-full
      max-w-[430px]
      overflow-hidden
      bg-white/[0.03]
    "
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/niki.png"
                alt="Niki Abedzadeh"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 32vw"
                className="
    object-cover
    object-center
    grayscale-[20%]
    transition-all
    duration-700
    ease-out
    group-hover:scale-[1.025]
    group-hover:grayscale-0
  "
              />

              {/* subtle dark overlay */}
              <div
                className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/25
          via-transparent
          to-transparent
        "
              />
            </div>

            {/* IMAGE CAPTION */}
            <div
              className="
        flex
        items-center
        justify-between
        border-t
        border-white/10
        px-1
        pt-3
      "
            >
              <span
                className="
          text-[0.58rem]
          uppercase
          tracking-[0.18em]
          text-white/25
        "
              >
                Niki Abedzadeh
              </span>

              <span
                className="
          text-[0.58rem]
          uppercase
          tracking-[0.18em]
          text-white/20
        "
              >
                Urban Designer
              </span>
            </div>
          </div>

          {/* INTRO */}
          <div
            className="
      max-w-[520px]
      mobile:self-end
      mobile:pb-[8vh]
    "
          >
            <p
              className="
        text-[clamp(1.25rem,1.8vw,1.8rem)]
        font-light
        leading-[1.4]
        tracking-[-0.025em]
        text-white/80
      "
            >
              I&apos;m Niki, an urban designer and researcher exploring how
              spatial analysis, computation and digital tools can help us
              understand cities more clearly.
            </p>

            <p
              className="
        mt-7
        max-w-[500px]
        text-[0.92rem]
        leading-[1.8]
        text-white/40
      "
            >
              My work sits between urban design, spatial analytics and web
              development. I&apos;m particularly interested in walkability,
              accessibility, spatial equity and computational approaches to
              urban research.
            </p>

            {/* SMALL META */}
            <div
              className="
        mt-10
        grid
        grid-cols-2
        gap-x-6
        gap-y-5
        border-t
        border-white/10
        pt-5
      "
            >
              <div>
                <p
                  className="
            text-[0.56rem]
            uppercase
            tracking-[0.18em]
            text-white/20
          "
                >
                  Discipline
                </p>

                <p className="mt-1 text-[0.75rem] text-white/50">
                  Urban Design
                </p>
              </div>

              <div>
                <p
                  className="
            text-[0.56rem]
            uppercase
            tracking-[0.18em]
            text-white/20
          "
                >
                  Focus
                </p>

                <p className="mt-1 text-[0.75rem] text-white/50">
                  Spatial Analytics
                </p>
              </div>

              <div>
                <p
                  className="
            text-[0.56rem]
            uppercase
            tracking-[0.18em]
            text-white/20
          "
                >
                  Tools
                </p>

                <p className="mt-1 text-[0.75rem] text-white/50">
                  GIS · Python · Web
                </p>
              </div>

              <div>
                <p
                  className="
            text-[0.56rem]
            uppercase
            tracking-[0.18em]
            text-white/20
          "
                >
                  Based in
                </p>

                <p className="mt-1 text-[0.75rem] text-white/50">Iran</p>
              </div>
            </div>
          </div>
        </section>

        {/* AREAS */}
        <section className="border-t border-white/10 py-14 mobile:py-20">
          <div className="grid gap-10 mobile:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p
                className="
                  text-[0.68rem]
                  uppercase
                  tracking-[0.25em]
                  text-white/35
                "
              >
                Areas
              </p>
            </div>

            <div className="grid gap-3">
              {[
                ["01", "Urban Design"],
                ["02", "Spatial Analytics & GIS"],
                ["03", "Computational Urbanism"],
                ["04", "Web Development"],
              ].map(([number, title]) => (
                <div
                  key={title}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    py-5
                  "
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[0.65rem] text-white/20">
                      {number}
                    </span>

                    <span
                      className="
                        text-[clamp(1.2rem,2vw,1.8rem)]
                        font-light
                        tracking-[-0.025em]
                        text-white/70
                        transition-transform
                        duration-300
                        group-hover:translate-x-2
                        group-hover:text-white
                      "
                    >
                      {title}
                    </span>
                  </div>

                  <span className="text-white/20">↗</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* APPROACH */}
        <section className="border-t border-white/10 py-14 mobile:py-20">
          <div className="grid gap-10 mobile:grid-cols-[0.7fr_1.3fr]">
            <p
              className="
                text-[0.68rem]
                uppercase
                tracking-[0.25em]
                text-white/35
              "
            >
              Approach
            </p>

            <div className="max-w-[750px]">
              <p
                className="
                  text-[clamp(1.4rem,3vw,2.8rem)]
                  font-light
                  leading-[1.25]
                  tracking-[-0.04em]
                  text-white/70
                "
              >
                I like working across disciplines rather than treating design,
                research and technology as separate practices.
              </p>

              <p
                className="
                  mt-7
                  max-w-[600px]
                  text-[0.95rem]
                  leading-[1.8]
                  text-white/40
                "
              >
                That means moving between maps, datasets, urban theory, code and
                visual design — depending on what the question requires.
              </p>
            </div>
          </div>
        </section>

        {/* CURRENTLY */}
        <section className="border-t border-white/10 py-14 mobile:py-20">
          <div className="grid gap-10 mobile:grid-cols-[0.7fr_1.3fr]">
            <p
              className="
                text-[0.68rem]
                uppercase
                tracking-[0.25em]
                text-white/35
              "
            >
              Currently
            </p>

            <div className="grid gap-6">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/25">
                  Research
                </p>

                <p className="mt-2 max-w-[700px] text-[1.05rem] leading-[1.7] text-white/60">
                  Exploring walkability, pedestrian accessibility, spatial
                  equity and data-driven urban analysis.
                </p>
              </div>

              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/25">
                  Development
                </p>

                <p className="mt-2 max-w-[700px] text-[1.05rem] leading-[1.7] text-white/60">
                  Building interactive urban tools and experiments using React,
                  Next.js, GIS and spatial data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        {/* CONTACT */}
        <section className="border-t border-white/10 py-16 mobile:py-24">
          <div className="grid gap-10 mobile:grid-cols-[0.7fr_1.3fr]">
            <p
              className="
        text-[0.68rem]
        uppercase
        tracking-[0.25em]
        text-white/35
      "
            >
              Connect
            </p>

            <div>
              <h2
                className="
          max-w-[800px]
          text-[clamp(2.2rem,5vw,5rem)]
          font-light
          leading-[1]
          tracking-[-0.055em]
        "
              >
                Have a project,
                <br />
                research idea or
                <br />
                collaboration in mind?
              </h2>

              <p
                className="
          mt-7
          max-w-[550px]
          text-[0.95rem]
          leading-[1.8]
          text-white/35
        "
              >
                I&apos;m always interested in conversations around cities,
                spatial research, computational methods and digital urban tools.
              </p>

              {/* LINKS */}
              <div
                className="
          mt-12
          grid
          border-t
          border-white/10
          mobile:grid-cols-2
        "
              >
                {/* UNIVERSITY EMAIL */}
                <a
                  href="mailto:k.abedzade@ut.ac.ir"
                  className="
            group
            flex
            items-center
            justify-between
            border-b
            border-white/10
            py-5
            transition-colors
            hover:border-white/40
          "
                >
                  <div>
                    <p
                      className="
                text-[0.6rem]
                uppercase
                tracking-[0.18em]
                text-white/20
              "
                    >
                      University Email
                    </p>

                    <p
                      className="
                mt-1
                text-[0.9rem]
                text-white/60
                transition-colors
                group-hover:text-white
              "
                    >
                      k.abedzade@ut.ac.ir
                    </p>
                  </div>

                  <span
                    className="
              mr-4
              text-white/20
              transition-all
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
              group-hover:text-white
            "
                  >
                    ↗
                  </span>
                </a>

                {/* PERSONAL EMAIL */}
                <a
                  href="mailto:nikiabedzade@gmail.com"
                  className="
            group
            flex
            items-center
            justify-between
            border-b
            border-white/10
            py-5
            mobile:pl-8
            transition-colors
            hover:border-white/40
          "
                >
                  <div>
                    <p
                      className="
                text-[0.6rem]
                uppercase
                tracking-[0.18em]
                text-white/20
              "
                    >
                      Personal Email
                    </p>

                    <p
                      className="
                mt-1
                text-[0.9rem]
                text-white/60
                transition-colors
                group-hover:text-white
              "
                    >
                      nikiabedzade@gmail.com
                    </p>
                  </div>

                  <span
                    className="
              mr-4
              text-white/20
              transition-all
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
              group-hover:text-white
            "
                  >
                    ↗
                  </span>
                </a>

                {/* LINKEDIN */}
                <a
                  href="https://www.linkedin.com/in/niki-abedzade/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
            group
            flex
            items-center
            justify-between
            border-b
            border-white/10
            py-5
            transition-colors
            hover:border-white/40
          "
                >
                  <div>
                    <p
                      className="
                text-[0.6rem]
                uppercase
                tracking-[0.18em]
                text-white/20
              "
                    >
                      Network
                    </p>

                    <p
                      className="
                mt-1
                text-[0.9rem]
                text-white/60
                transition-colors
                group-hover:text-white
              "
                    >
                      LinkedIn
                    </p>
                  </div>

                  <span
                    className="
              mr-4
              text-white/20
              transition-all
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
              group-hover:text-white
            "
                  >
                    ↗
                  </span>
                </a>

                {/* GITHUB */}
                <a
                  href="https://github.com/nikiabed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
            group
            flex
            items-center
            justify-between
            border-b
            border-white/10
            py-5
            mobile:pl-8
            transition-colors
            hover:border-white/40
          "
                >
                  <div>
                    <p
                      className="
                text-[0.6rem]
                uppercase
                tracking-[0.18em]
                text-white/20
              "
                    >
                      Code
                    </p>

                    <p
                      className="
                mt-1
                text-[0.9rem]
                text-white/60
                transition-colors
                group-hover:text-white
              "
                    >
                      GitHub
                    </p>
                  </div>

                  <span
                    className="
              mr-4
              text-white/20
              transition-all
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
              group-hover:text-white
            "
                  >
                    ↗
                  </span>
                </a>

                {/* CV */}
                <a
                  href="/Niki-Abedzadeh-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
            group
            flex
            items-center
            justify-between
            border-b
            border-white/10
            py-5
            transition-colors
            hover:border-white/40
            mobile:col-span-2
          "
                >
                  <div>
                    <p
                      className="
                text-[0.6rem]
                uppercase
                tracking-[0.18em]
                text-white/20
              "
                    >
                      Curriculum Vitae
                    </p>

                    <p
                      className="
                mt-1
                text-[0.9rem]
                text-white/60
                transition-colors
                group-hover:text-white
              "
                    >
                      View / Download CV
                    </p>
                  </div>

                  <span
                    className="
              mr-4
              text-white/20
              transition-all
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
              group-hover:text-white
            "
                  >
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex items-center justify-between border-t border-white/10 py-6">
          <p className="text-[0.62rem] uppercase tracking-[0.16em] text-white/20">
            Niki Abedzadeh
          </p>

          <p className="text-[0.62rem] uppercase tracking-[0.16em] text-white/20">
            Urban Design · Data · Technology
          </p>
        </footer>
      </div>
    </main>
  );
}
