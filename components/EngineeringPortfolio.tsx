"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
/* ---------------------------------------
   Single-file portfolio with modal details
   Tailwind CSS required
---------------------------------------- */

type YearBucket = "Year 1" | "Year 2" | "Personal Projects";

/** Interleaved rich content for the modal body */
type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "img"; src: string; alt?: string; caption?: string }
  | { type: "video"; src: string; caption?: string }
  | { type: "pdf"; src: string; caption?: string; height?: number };

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  year: YearBucket;
  image?: string;
  description: string;       // short blurb (card)
  longDescription?: string;  // fallback detailed text (modal)
  content?: ContentBlock[];  // rich interleaved blocks (modal)
  tags: string[];
  links?: { label: string; href: string }[];
  impact?: string;
  gallery?: string[];        // optional extra images (grid) for modal
};

// Demo data — replace with your real projects
const PROJECTS: Project[] = [
  {
    id: "y1-orthographic-sketches",
    title: "Orthographic Sketches",
    subtitle: "Detailed sketches of mechanical parts",
    year: "Year 1",
    image: "/Orthographic1.png", // put file in /public
    description:
      "Learned to visualize and sketch complex parts using orthographic projection.",
    impact: "Produced detailed sketches of 2 mechanical parts",
    tags: ["Sketching"],
    
    // Interleaved text + images inside the modal:
    content: [
      {
        type: "p",
        text: "Goal: Produce 2 detailed orthographic sketches of mechanical parts.",
      },
      {
        type: "img",
        src: "/Orthographic1.png",
        alt: "Sketch 1",
        caption: "Sketch 1",
      },

      {
        type: "img",
        src: "/Orthographic2.png",
        alt: "Sketch 2",
        caption: "Sketch 2",
      },

      {
        type: "img",
        src: "/Orthographic3.png",
        alt: "Sketch 3",
        caption: "Sketch 3",
      },

    {
        type: "img",
        src: "/Orthographic4.png",
        alt: "Sketch 4",
        caption: "Sketch 4",
      },
    ],
    // Optional: extra images as a grid at the end of the modal
    //gallery: ["/Orthographic2.png", "/Orthographic3.png"],
  },
  {
    id: "y1-design-and-make",
    title: "Design and Make Group Project",
    subtitle: "Created an automated cone dispenser for use on smart motorways",
    year: "Year 1",
    image:
      "/DesignandMake5.png", // put file in /public
    description: "Worked in a group of 5 to design and build a prototype of an automated cone dispenser.",
    tags: ["Design", "Group Project", "Electronics"],
    impact: "Designed and built a working prototype of an automated cone dispenser",
    // Interleaved text + images inside the modal:
    content: [
      {
        type: "p",
        text: "Design and build a working prototype of an automated cone dispenser for use on smart motorways.",
      },
      {
        type: "p",
        text: "We started by brainstorming ideas and creating initial sketches of our design",
      },
      {
        type: "img",
        src: "/DesignandMake1.png",
        caption: "Inital concept sketches",
      },
      {
        type: "p",
        text: "We calculated the forces acting on the cones along with the required speeds to dispense all the cones within the timeframe.",
      },
      {
        type: "img",
        src: "/DesignandMake2.png",
        caption: "Cone calculations",
      },
      {
        type: "p",
        text: "We then started to create CAD models of our design. A key part was the scotch yoke mechanism to push the cones off the side of the dispenser.",
      },
      {
        type: "img",
        src: "/DesignandMake3.png",
        caption: "Scotch yoke mechanism CAD",
      },
      {
        type: "p",
        text: "We then produced a final CAD model of the entire dispenser.",
      },
      {
        type: "img",
        src: "/DesignandMake4.png",
        caption: "Final CAD model of the dispenser",
      },
      {
        type: "p",
        text: "We then produced engineering drawings of the parts to be manufactured.",
      },
      {
        type: "img",
        src: "/DesignandMake5.png",
        caption: "Engineering drawings",
      },
      {
        type: "img",
        src: "/DesignandMake6.png",
        caption: "Engineering drawings",
      },
      {
        type: "img",
        src: "/DesignandMake7.png",
        caption: "Engineering drawings",
      },
      {
        type: "p",
        text: "We then assembled all the parts and tested it to ensure it worked as intended.",
      },
      {
        type: "video",
        src: "/DesignandMake9.mp4",
        caption: "Cone dispenser in action",
      },
      {
        type: "p",
        text: "We delivered a final presentation on our work and our improvements for next time.",
      },
      {
        type: "img",
        src: "/DesignandMake8.png",
        caption: "Presentation slides",
      },
    ]

  },
  {
    id: "y1-epicyclic-gearbox",
    title: "Epicyclic Gearbox Design",
    subtitle: "CAD project",
    year: "Year 1",
    image:
      "/EGearbox1.png", // put file in /public
    description: "Designed an epicyclic gearbox in CAD",
    tags: ["Design", "CAD"],
    
    // Interleaved text + images inside the modal:
    content: [
      {
        type: "p",
        text: "Created a storyboard to show the assembly and disassembly of the gearbox.",
      },
      {
        type: "video",
        src: "/EGearbox2.mp4",
        caption: "Storyboard video",
      },
    ]
    
  },
  {
    id: "y1-airjet-report",
    title: "Airjet Lab Report",
    subtitle: "Report",
    year: "Year 1",
    image:
      "/airjet1.png", // put file in /public
    description: "Investigation into the interaction of a free air jet with its surroundings.",
    tags: ["Report"],
    
    // Interleaved text + images inside the modal:
    content: [
      {
        type: "p",
        text: "A nozzle with diameter 30 mm creates an approximately uniform circular jet of air. The velocity distribution in the jet is measured using a pitot-static tube which can be traversed along the axial length and across the vertical span of the jet. The pitot-static tube is connected to an inclined manometer.",
      },
      {
        type: "img",
        src: "/airjet1.png",
        caption: "Apparatus",
      },
      {
        type: "p",
        text: "Centreline velocity",
      },
      {
        type: "img",
        src: "/airjet2.png",
        caption: "Graphs",
      },
      {
        type: "p",
        text: "Centreline velocity sketch",
      },
      {
        type: "img",
        src: "/airjet3.png",
        caption: "Sketch",
      },
    ]
    
  },
  {
    id: "y2-heatshield",
    title: "Numerical modelling of a spacecraft heatshield tile",
    subtitle: "MATLAB simulation",
    year: "Year 2",
    image:
      "/Tile1.png", // put file in /public
    description:
      "Modelling of a spacecraft heatshield tile during re-entry using MATLAB.",
    tags: ["MATLAB", "Modelling", "Aerospace"],
    
    content: [
      {
        type: "p",
        text: "Initially the data had to be sourced using a automatic image analysis of the plots. It processes an image of a temperature-time graph to extract and convert temperature and time data from pixel coordinates into actual values. ",
      },
      {
        type: "img",
        src: "/Tile3.png",
        caption: "Original image",
      },
      {
        type: "img",
        src: "/Tile2.png",
        caption: "Graph after using auto image analysis",
      },
      {
        type: "p",
        text: "Heat equations",
      },
      {
        type: "img",
        src: "/Tile4.png",
        caption: "Heat equations",
      },
      {
        type: "p",
        text: "A range of numerical methods were used to model the temperature. To apply these methods both time and space were discretised into a spatial and time domain. The temperature and time data from the images were used as initial boundary conditions along with Neumann boundaries as the heat flux on the inner surface would be zero.",
      },
      {
        type: "img",
        src: "/Tile5.png",
        caption: "Heat equations",
      },
      {
        type: "p",
        text: "To choose an appropriate method for selecting tile thickness, the accuracy and stability of the four methods were evaluated. This was done by running each one with a range of timesteps, and then separately with a range of spatial steps, and recording the temperature at the inner surface of the tile at a time of 4000s.",
      },
      {
        type: "img",
        src: "/Tile6.png",
        caption: "Time step variation",
      },
      {
        type: "img",
        src: "/Tile7.png",
        caption: "Spatial step variation",
      },
      {
        type: "p",
        text: "Choosing a tile thickness",
      },
      {
        type: "img",
        src: "/Tile9.png",
        caption: "Tile thickness variation",
      },
      {
        type: "p",
        text: "Final application",
      },
      {
        type: "img",
        src: "/Tile10.png",
        caption: "Final application GUI",
      },
    ]

  },
  {
    id: "y2-stratospheric-balloon",
    title: "Modelling of a Stratospheric Balloon",
    subtitle: "MATLAB simulation",
    year: "Year 2",
    image:
      "/Balloon1.png", // put file in /public
    description:
      "Simulated ascent and descent of a stratospheric balloon with a sand payload to its desired position.",
    tags: ["MATLAB", "Modelling", "Aerospace"],
    
    content: [
      {
        type: "p",
        text: "Created a MATLAB simulation to model the ascent and descent of a stratospheric balloon with a sand payload to its desired position.",
      },
      {
        type: "img",
        src: "/Balloon2.png",
        caption: "Application GUI",
      },
    ]

  },
  {
    id: "y2-machine-design",
    title: "Machine Design Project",
    subtitle: "Group project",
    year: "Year 2",
    image:
      "/Machine3.png",
    description:
      "Designed a machine that assembles batteries into packs in a group of 5.",
    tags: ["Design", "Group Project", "CAD"],
    content: [
      {
        type: "p",
        text: "Created initial concept sketches and brainstormed ideas.",
      },
      {
        type: "img",
        src: "/Machine1.png",
        caption: "Concept sketches",
      },
      {
        type: "p",
        text: "Concept design chart",
      },
      {
        type: "img",
        src: "/Machine2.png",
        caption: "Concept sketches",
      },
      {
        type: "p",
        text: "Final engineering drawings",
      },
      {
        type: "img",
        src: "/Machine3.png",
        caption: "Drawings",
      },
      {
        type: "img",
        src: "/Machine4.png",
        caption: "Drawings",
      },
      {
        type: "img",
        src: "/Machine5.png",
        caption: "Drawings",
      },
      {
        type: "img",
        src: "/Machine6.png",
        caption: "Drawings",
      },
      {
        type: "p",
        text: "Storyboard process",
      },
      {
        type: "img",
        src: "/Machine7.png",
        caption: "Storyboard",
      },
      {
        type: "img",
        src: "/Machine7.png",
        caption: "Storyboard",
      },
      {
        type: "img",
        src: "/Machine8.png",
        caption: "Storyboard",
      },
      {
        type: "img",
        src: "/Machine9.png",
        caption: "Storyboard",
      },
      {
        type: "img",
        src: "/Machine10.png",
        caption: "Storyboard",
      },
      {
        type: "img",
        src: "/Machine11.png",
        caption: "Storyboard",
      },
    ]
  },
  {
    id: "y2-product-design",
    title: "Product Design",
    subtitle: "Design",
    year: "Year 2",
    image:
      "/Product5.png", // put file in /public
    description:
      "Designed a device that allows people with joint pain to stand for longer periods of time and move between the standing and sitting positions more comfortably while watching a sports match. ",
    tags: ["Design", "Eco Audits"],
    
    content: [
      {
        type: "p",
        text: "Researced the initial requirements and market",
      },
      {
        type: "img",
        src: "/Product1.png",
        caption: "Sheet 1",
      },
      {
        type: "p",
        text: "Concept evaluation",
      },
      {
        type: "img",
        src: "/Product2.png",
        caption: "Sheet 2",
      },
      {
        type: "p",
        text: "Final design",
      },
      {
        type: "img",
        src: "/Product3.png",
        caption: "Sheet 3",
      },
      {
        type: "p",
        text: "Materials and manufacturing",
      },
      {
        type: "img",
        src: "/Product4.png",
        caption: "Sheet 4",
      },
    ]

  },
  {
    id: "y2-shaft-design",
    title: "Shaft Design",
    subtitle: "Design",
    year: "Year 2",
    image:
      "/Shaft1.png", // put file in /public
    description:
      "The task was to design a layshaft, contained in a casing, to transmit power between an electric motor at 1440 rpm driving a positive displacement multi-cylinder piston pump operating at 150 rpm.  ",
    tags: ["Design", "Calculations"],
    
    content: [
      {
        type: "p",
        text: "Free body diagram",
      },
      {
        type: "img",
        src: "/Shaft2.png",
        caption: "Free body diagram",
      },
      {
        type: "p",
        text: "Bending moment and torque diagrams",
      },
      {
        type: "img",
        src: "/Shaft3.png",
        caption: "Diagrams",
      },
      {
        type: "p",
        text: "Stress concentration analysis spreadsheet",
      },
      {
        type: "img",
        src: "/Shaft4.png",
        caption: "Spreadsheet",
      },
      
    ]

  },
  {
    id: "y2-aerofoil-report",
    title: "Aerofoil Lab Report",
    subtitle: "Report",
    year: "Year 2",
    image:
      "/Aerofoil2.png", // put file in /public
    description:
      "Investigation into the lift generated by a NACA 2415 aerofoil in a wind tunnel.",
    tags: ["Report", "Aerospace"],
    
    content: [
      {
        type: "p",
        text: "Wind tunnel diagram",
      },
      {
        type: "img",
        src: "/Aerofoil1.png",
        caption: "Wind tunnel diagram",
      },
      {
        type: "p",
        text: "MATLAB plot of BATH and NACA data",
      },
      {
        type: "img",
        src: "/Aerofoil2.png",
        caption: "Diagrams",
      },
      {
        type: "p",
        text: "Pressure bubble diagram",
      },
      {
        type: "img",
        src: "/Aerofoil3.png",
        caption: "Spreadsheet",
      },
      
    ]

  },
  {
    id: "y2-control-report",
    title: "Systems and Control Lab Report",
    subtitle: "Report",
    year: "Year 2",
    image:
      "/Control9.png", // put file in /public
    description:
      "Construction of a DC motor model from first principles and validate it through experimentation.",
    tags: ["Report", "Systems and Control"],
    
    content: [
      {
        type: "p",
        text: "DC motor modelling",
      },
      {
        type: "img",
        src: "/Control1.png",
        
      },
      {
        type: "p",
        text: "Comparison between actual motor speed and simulation model output with average gain and time constant.",
      },
      {
        type: "img",
        src: "/Control2.png",
        
      },
      {
        type: "p",
        text: "Position-time graph for the measured angle against the demand angle for the Kp values 0.1, 1, 2, 4",
      },
      {
        type: "img",
        src: "/Control3.png",
        
      },
      {
        type: "p",
        text: "Plot of voltage (V) output against time (s) at varied signal amplitudes to investigate saturation",
      },
      {
        type: "img",
        src: "/Control4.png",
        
      },
      {
        type: "p",
        text: "Influence of derivative gain on system response - Position (rad) vs. Time (s)",
      },
      {
        type: "img",
        src: "/Control5.png",
        
      },
      {
        type: "p",
        text: "Graph of position(rad) against time(s) and the voltage disturbance against time (s) ",
      },
      {
        type: "img",
        src: "/Control6.png",
        
      },
      {
        type: "p",
        text: "Graph of position (rad) against time (s) to show the effect of a 3V disturbance on different values of Kp.",
      },
      {
        type: "img",
        src: "/Control7.png",
        
      },
      {
        type: "p",
        text: "Graph of position (rad) against time (s) to show the effect of a 3V disturbance on different values of Kd.)",
      },
      {
        type: "img",
        src: "/Control8.png",
        
      },
      {
        type: "p",
        text: "Graph of position (rad) against time (s) to show the effect of a 3V disturbance on different values of Ki.",
      },
      {
        type: "img",
        src: "/Control9.png",
        
      },
    ]

  },
  {
    id: "y2-steam-report",
    title: "Steam motor Lab Report",
    subtitle: "Report",
    year: "Year 2",
    image:
      "/Steam5.png", // put file in /public
    description:
      "Investigation into the performance of a steam plant and analyse in comparison to an ideal Rankine cycle.",
    tags: ["Report", "Thermodynamics"],
    
    content: [
      {
        type: "p",
        text: "Apparatus diagram",
      },
      {
        type: "img",
        src: "/Steam1.png",
        caption: "Apparatus diagram",
      },
      {
        type: "p",
        text: "Comparison of ideal and actual Rankine cycle",
      },
      {
        type: "img",
        src: "/Steam2.png",
        caption: "Comparison",
      },
      {
        type: "p",
        text: "Willans line used to make an estimate of the frictional losses in the motor",
      },
      {
        type: "img",
        src: "/Steam3.png",
        caption: "Willans line",
      },
      {
        type: "p",
        text: "The specific steam consumption is a measure of the motor efficiency. ",
      },
      {
        type: "img",
        src: "/Steam4.png",
        caption: "SSC",
      },
      {
        type: "p",
        text: "Steady flow analysis is used to analyse the individual energy flows and calculate the boiler efficiency along with the overall thermal efficiency. ",
      },
      {
        type: "img",
        src: "/Steam5.png",
        caption: "Sankey diagram",
      },
    ]

  },
  {
    id: "y2-vibrations-report",
    title: "Vibrations Lab Report",
    subtitle: "Report",
    year: "Year 2",
    image:
      "/Vibrations3.png", // put file in /public
    description:
      "Investigation into the effects of damping on a vibrating system.",
    tags: ["Report", "MATLAB"],
    
    content: [
      {
        type: "p",
        text: "Force - position graph",
      },
      {
        type: "img",
        src: "/Vibrations1.png",
        
      },
      {
        type: "p",
        text: "Calculation of the spring rate by taking the gradient of the line passing through the points of maximum and minimum displacement",
      },
      {
        type: "img",
        src: "/Vibrations2.png",
        caption: "Sprint rate calculation",
      },
      {
        type: "p",
        text: "Viscous damping rates",
      },
      {
        type: "img",
        src: "/Vibrations3.png",
        
      },
      {
        type: "p",
        text: "Viscous damping rates using piecewise energy method",
      },
      {
        type: "img",
        src: "/Vibrations4.png",
        caption: "With Coulomb friction",
      },
      
      {
        type: "img",
        src: "/Vibrations5.png",
        caption: "Without Coulomb friction",
      },
      {
        type: "p",
        text: "Effect of addition of spring to damper",
      },
      {
        type: "img",
        src: "/Vibrations6.png",
        caption: "Force- displacement graph",
      },
      
    ]

  },
  {
    id: "tbh-design",
    title: "Soft Replacement for titanium casing",
    subtitle: "Team Bath Heart",
    year: "Personal Projects",
    image:
      "/TBH3.png",
    description:
      "Designed a flexible, biocompatible casing to replace titanium for Team Bath Heart's artificial heart.",
    tags: ["Design", "Biology"],
    
    content: [
      {
        type: "p",
        text: "The bags were designed to fill under Venus pressure only, however, the low pressure inside the casing will cause the bag to expand at a faster rate, ”pulling” the blood through the inlet valve too fast. This may damage the bloods To solve it a flexible, biocompatible casing can be used with the idea of the casing contracting to prevent the pressure inside the casing decreasing too much."
      },
      
      {
        type: "p",
        text: "I then researched biocompatible materials that could be used for the casing",
      },
      {
        type: "img",

        src: "/TBH1.png",
      },
      {
        type: "img",
        src: "/TBH2.png",
      },
      {
        type: "p",
        text: "Design 1",
      },
      {
        type: "img",
        src: "/TBH3.png",
      },
      {
        type: "img",
        src: "/TBH4.png",
      },
      {
        type: "img",
        src: "/TBH5.png",
      },
      {
        type: "p",
        text: "Design 2",
      },
      {
        type: "img",
        src: "/TBH6.png",
        
      },
      {
        type: "img",
        src: "/TBH7.png",

      },
      {
        type: "p",
        text: "Overall challenges",
      },
      {
        type: "img",
        src: "/TBH8.png",
        
      },
      
    ]


  },
  {
    id: "p-MC",
    title: "Monte Carlo Simulation",
    subtitle: "Stock portfolio prediction",
    year: "Personal Projects",
    image:
      "/MC1.png",
    description:
      "Simulates an investment portfolio evolving over time using Monte Carlo methods.",
    tags: ["Algorithms", "Python"],
    content: [
      {
        type: "p",
        text: "This code downloads historical stock price data for a list of Australian companies, calculates their daily returns, and uses this information to estimate expected returns and the covariance matrix. It then generates random portfolio weights and runs a Monte Carlo simulation to model how a $10,000 investment in this portfolio could evolve over 100 days. By simulating 100 different possible scenarios, it produces and plots a set of potential future portfolio value paths."
      },
      { 
        type: "img",
        src: "/MC1.png",

      },
    ]
  },
  
];

const YEAR_GROUPS: YearBucket[] = ["Year 1", "Year 2", "Personal Projects"];
const ALL_TAGS = Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort();

export default function EngineeringPortfolio() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Strongly-typed refs for each year strip
  const containers = useRef<Record<YearBucket, HTMLDivElement | null>>({
    "Year 1": null,
    "Year 2": null,
    "Personal Projects": null,
  });

  // Lock page scroll when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    if (!activeTag) return PROJECTS;
    return PROJECTS.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  const grouped = useMemo(() => {
    const byYear: Record<YearBucket, Project[]> = {
      "Year 1": [],
      "Year 2": [],
      "Personal Projects": [],
    };
    for (const p of filtered) byYear[p.year].push(p);
    return byYear;
  }, [filtered]);

  const scrollBy = (key: YearBucket, delta: number) => {
    const el = containers.current[key];
    if (el) el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Peter Eriksson - Portfolio
            </h1>
            <p className="mt-3 text-neutral-600 max-w-2xl">
              Mechanical engineering projects from university and personal builds.
              Explore by year and filter by skill.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip
              active={!activeTag}
              onClick={() => setActiveTag(null)}
              label="All"
            />
            {ALL_TAGS.map((t) => (
              <FilterChip
                key={t}
                active={activeTag === t}
                onClick={() => setActiveTag(t)}
                label={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Year strips */}
      <div className="space-y-12">
        {YEAR_GROUPS.map((year) => (
          <section key={year} className="relative">
            <div className="sticky top-0 z-10 backdrop-blur bg-neutral-50/70 border-b">
              <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{year}</h2>
                <div className="flex gap-2">
                  <IconButton
                    label="Scroll left"
                    onClick={() => scrollBy(year, -600)}
                  >
                    ←
                  </IconButton>
                  <IconButton
                    label="Scroll right"
                    onClick={() => scrollBy(year, 600)}
                  >
                    →
                  </IconButton>
                </div>
              </div>
            </div>

            <div className="max-w-screen-2xl mx-auto px-6">
              <div
                ref={(el: HTMLDivElement | null) => {
                  containers.current[year] = el;
                }}
                className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-8 pt-6"
                role="list"
                aria-label={`${year} projects`}
              >
                {grouped[year].length === 0 ? (
                  <EmptyCard />
                ) : (
                  grouped[year].map((p) => (
                    <ProjectCard
                      key={p.id}
                      p={p}
                      onOpen={() => setActiveProject(p)}
                    />
                  ))
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 text-sm text-neutral-500">
        <p>
         © {new Date().getFullYear()} Peter Eriksson — Built with React & Tailwind.
        <a
          className="underline ml-1"
          href="/ERIKSSON_PETER_BATH_CV.pdf"
          download="PeterEriksson_CV.pdf"
        >
      Download CV
    </a>
  </p>
</footer>

      {/* Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </main>
  );
}

/* ---------------- Components ---------------- */

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`px-3 py-1.5 rounded-full border text-sm ${
        active
          ? "bg-black text-white border-black"
          : "bg-white hover:bg-neutral-100 border-neutral-300"
      }`}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function ProjectCard({
  p,
  onOpen,
}: {
  p: Project;
  onOpen: () => void;
}) {
  return (
    <article
      role="listitem"
      className="min-w-[300px] sm:min-w-[360px] md:min-w-[420px] snap-start"
    >
      {/* Make the whole card clickable via a button for a11y */}
      <button
        onClick={onOpen}
        className="bg-white text-left rounded-2xl shadow-sm border overflow-hidden h-full flex flex-col w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
        aria-label={`Open details for ${p.title}`}
      >
        {p.image && (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-5 flex flex-col gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
            {p.subtitle && (
              <p className="text-neutral-600 text-sm mt-0.5">{p.subtitle}</p>
            )}
          </div>

          {p.impact && (
            <p className="text-emerald-700 text-sm font-medium">{p.impact}</p>
          )}

          <p className="text-sm text-neutral-700 leading-relaxed line-clamp-3">
            {p.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            {p.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-neutral-100 border text-xs"
              >
                {t}
              </span>
            ))}
          </div>

          {p.links && p.links.length > 0 && (
            <div
              className="flex gap-3 mt-2 flex-wrap"
              onClick={(e) => e.stopPropagation()} // allow clicking links without opening modal again
            >
              {p.links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  className="text-sm underline underline-offset-4 hover:no-underline"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </button>
    </article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Focus the close button when opening (basic focus management)
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className="w-full sm:max-w-3xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl border overflow-hidden">
        {/* Header */}
        <div className="flex items-start gap-4 p-5 border-b">
          {project.image && (
            <div className="hidden sm:block w-24 h-16 relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="96px"
                className="object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold leading-tight">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-neutral-600 text-sm mt-0.5">
                {project.subtitle}
              </p>
            )}
            {project.impact && (
              <p className="text-emerald-700 text-sm font-medium mt-1">
                {project.impact}
              </p>
            )}
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-xl border bg-white hover:bg-neutral-100 grid place-items-center"
            aria-label="Close details"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h[70vh] sm:max-h-[70vh] overflow-y-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-neutral-100 border text-xs"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Content renderer: prefers rich blocks, falls back to longDescription/description */}
          {project.content ? (
            <div className="space-y-4">
              {project.content.map((b, i) => {
                switch (b.type) {
                  case "h3":
                    return (
                      <h3 key={i} className="text-base font-semibold">
                        {b.text}
                      </h3>
                    );

                  case "p":
                    return (
                      <p key={i} className="text-sm text-neutral-800 leading-relaxed">
                        {b.text}
                      </p>
                    );

                  case "pdf": {
                    const { src, caption, height } = b;
                    return (
                      <figure key={i} className="space-y-2">
                        <object
                          data={src}
                          type="application/pdf"
                          className="w-full rounded-lg border"
                          style={{ height: `${height ?? 560}px` }}
                        >
                          <p className="text-sm">
                            This PDF can’t be displayed inline.{" "}
                            <a
                              className="underline"
                              href={src}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open the PDF
                            </a>
                            .
                          </p>
                        </object>
                        {caption && (
                          <figcaption className="text-xs text-neutral-600">
                            {caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }

                  case "img": {
                    const { src, alt, caption } = b;
                    const isPdf = src.toLowerCase().endsWith(".pdf");
                    return (
                      <figure key={i} className="space-y-2">
                        {isPdf ? (
                          <object
                            data={src}
                            type="application/pdf"
                            className="w-full rounded-lg border"
                            style={{ height: "560px" }}
                          >
                            <p className="text-sm">
                              This PDF can’t be displayed inline.{" "}
                              <a
                                className="underline"
                                href={src}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Open the PDF
                              </a>
                              .
                            </p>
                          </object>
                        ) : (
                          <img
                            src={src}
                            alt={alt ?? ""}
                            className="w-full rounded-lg border object-cover"
                            loading="lazy"
                          />
                        )}
                        {caption && (
                          <figcaption className="text-xs text-neutral-600">
                            {caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }

                  case "video": {
                    const { src, caption } = b;
                    return (
                      <figure key={i} className="space-y-2">
                        <video
                          src={src}
                          controls
                          className="w-full rounded-lg border"
                          preload="metadata"
                        />
                        {caption && (
                          <figcaption className="text-xs text-neutral-600">
                            {caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }

                  default:
                    return null;
                }
              })}
            </div>
          ) : (
            <p className="text-sm text-neutral-800 leading-relaxed whitespace-pre-line">
              {project.longDescription ?? project.description}
            </p>
          )}

          {/* Optional gallery grid */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} image ${i + 1}`}
                  className="w-full h-28 object-cover rounded-lg border"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {/* Links (kept inside modal too) */}
          {project.links && project.links.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {project.links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  className="text-sm underline underline-offset-4 hover:no-underline"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



function IconButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      className="w-9 h-9 rounded-xl border bg-white hover:bg-neutral-100 grid place-items-center"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <span className="text-lg leading-none">{children}</span>
    </button>
  );
}

function EmptyCard() {
  return (
    <div className="min-w-[300px] sm:min-w-[360px] md:min-w-[420px] snap-start">
      <div className="border-2 border-dashed rounded-2xl p-6 h-full grid place-items-center text-neutral-500 bg-neutral-50">
        <p>No projects yet in this section.</p>
      </div>
    </div>
  );
}
