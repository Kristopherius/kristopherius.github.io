export const siteConfig = {
  name: "Krzysztof Paczkowski",
  title: "Game Developer, Designer and Enthusiast",
  description: "Portfolio website of Krzysztof Paczkowski",
  accentColor: "#427e51",
  social: {
    email: "k.p.paczkowski98@gmail.com",
    linkedin: "https://www.linkedin.com/in/chris-donutello/",
    twitter: "",
    github: "https://github.com/Kristopherius",
  },
  aboutMe:
    "I was born in 1998 Poland, raised in Belgium, living in the Netherlands. I recently graduated Game Design at Hanze University of Groningen. Ever since I've gotten my hands on the first computer in our family, when I was 4 or 5, I was stuck to it forever. Over the course of my life I have played a lot of games, and from that passion I learned to value the hard work and dedication that goes into the art of the craft.",
  skills: ["Game Development", "Level Design", "Play-Testing", "Brand, Marketing & Monetization"],
  projects: [
    {
      {
  name: "Distraught",
  description: "Find your way through an abandoned village in DISTRAUGHT. My current W.I.P game!",
  link: "https://store.steampowered.com/app/3034640/Distraught/",
  skills: ["Unity 6", "C# VSCode", "Miro", "Audacity", "Kitbashing Models"],
  image: "/images/Distraught/DistraughtSquareLogo.png",
  detailedDescription: `<p>Test modal content</p>`, // ADD THIS LINE
}
    },
    {
      name: "Graduation Project",
      description:
        "My final submission at Hanze concentrated on creating a workshop program teaching children how to code parts of a video game",
      link: "",
      skills: ["Unity 5", "C# VSCode", "Rosyln", "Miro"],
      image: "/images/NVGM/NVGM_Front.png",
      dateRange: "January - July, 2024",
      detailedDescription: `
        <p>For my final project at University I developed a program that the <a href="https://www.nationaalvideogamemuseum.nl/" target="_blank" class="text-blue-600 hover:underline">National Video Game Museum</a> could use during their educational workshops. The primary focus was to teach their attendees how to code through a gamified learning process.</p>
        <p>By leveraging a Roslyn C# runtime compiler I created a set of instructions with exercises that the target audience used to learn game development with.</p>
        <p>Through gamification techniques such as badge rewards, progress tracking, and immediate feedback, the testers had improved retention and a positive experience learning coding!</p>
        <p>Here's a <a href="https://drive.google.com/drive/folders/1E_x5UPU_IEL1XR90r4n68USYuzrwnrR5?usp=drive_link" target="_blank" class="text-blue-600 hover:underline">walkthrough video</a>!</p>
      `,
      galleryImages: [
        "/images/NVGM/NVGM-Instructions.gif",
        "/images/NVGM/NVGM-Compiler.gif"
      ],
      technologies: "Made in Unity 5 with VSCode, Miro, Roslyn. Using free 2D assets from Itch.io"
    },
    {
      name: "Doom remake",
      description:
        "During one of my Courses at Uni, I re-created the first level of Doom 64 in order to learn the tools of Unreal Engine.",
      link: "https://drive.google.com/drive/folders/1E_x5UPU_IEL1XR90r4n68USYuzrwnrR5?usp=sharing",
      skills: ["Unreal Engine 5", "Blueprints", "Quixel"],
      image: "/images/Doom-Remake/Doom-Remake_Student.png",
      dateRange: "2023",
      detailedDescription: `
        <p>Recreating a level from the original DOOM in Unreal Engine was an exciting project that let me combine retro gaming with modern tools. My goal was to stay as true as possible to the original, keeping the layout and feel intact while giving it a fresh, updated look. It was fun experimenting with Unreal Engine's lighting and textures to bring a new level of atmosphere to the classic design while still capturing the gritty, eerie vibe of the original.</p>
        <p>Working on this helped me get comfortable with Unreal Engine's core features. I learned how to create the User Interface, set up lighting, apply textures and creating new scenes. Figuring out how to bring Doom's retro look to a modern engine was a challenge, but it taught me a lot about the tools and how to make a good looking environment. Every tweak to lighting and textures brought me closer to creating something that felt like a modern take on a classic.</p>
        <p>I also dove into bot AI and player controls to recreate the old-school feeling of the classic. Overall, the project gave me a solid understanding of Unreal Engine and how to take advantage of it to create future projects.</p>
      `,
      galleryImages: [
        "/images/Doom-Remake/DOOM-AI.gif",
        "/images/Doom-Remake/DOOM-Topview.gif",
        "/images/Doom-Remake/DOOM-1and2.gif"
      ],
      technologies: "Made in Unreal with Blueprints. Using Quixel and free 3D assets."
    },
    {
      name: "Chicken Chuck PI",
      description:
        "For one of my elective courses I chose to create a game from scratch to learn Level Design.",
      link: "https://drive.google.com/drive/folders/1pMollf4kFmbQ5UeSOOIkLxXtOdWddsjE?usp=sharing",
      skills: ["Unity 5", "C# VSCode", "Sketching"],
      image: "/images/ChickenPI/Chicken_PI.png",
      dateRange: "2023",
      detailedDescription: `
        <p>Creating a game from scratch was an exciting way to dive into learning level design. I learned how things like object placement, pacing, and visual cues impact how players interact with a level. It was a great first approach at making an impactful experience for the players. It was awesome to see how small details could make such a big difference in the overall experience.</p>
        <p>At the same time, I got to learn the tools behind the scenes. I worked on creating UI that was easy to use and visually appealing and experimented with creating a noir lighting to set a detective-y mood.</p>
        <p>This project taught me so much about both the creative and technical sides of game design. It was a great hands-on way to learn how all the pieces fit together and how even small decisions can shape the player's experience.</p>
      `,
      galleryImages: [
        "/images/ChickenPI/Chuck-1.gif",
        "/images/ChickenPI/Chuck-2.gif"
      ],
      technologies: "Made in Unity 5, VSCode. Using Synty and free Unity Store 3D & 2D assets."
    },
    {
      name: "NectAR",
      description:
        "One of my proudest accomplishments at the University was creating a digital app for a client whilst working in a group of 8 students!",
      link: "",
      skills: ["Unity 5", "C# VSCode", "Vuforia"],
      image: "/images/NectAR/NectAR_Logo.png",
      dateRange: "2022",
      detailedDescription: `
        <p>In a team of eight students, we created an augmented reality (AR) app for Android to teach users about rare and endangered plants in the Netherlands. The project lasted five months, and our goal was to make learning about biodiversity fun and engaging. From building AR features to curating educational content, we worked hard to bring the idea to life while balancing technical challenges and user-friendly design.</p>
        <p>I started as a programmer, working together with another student on creating the entire app within Unity and combining it with the Vuforia Engine for the AR functionality. Halfway through, I stepped up as the product owner, taking charge of prioritizing tasks, ensuring smooth communication, and keeping the project on track. It was a big shift, but it gave me valuable experience in leadership while still contributing technically.</p>
        <p>Looking back, I'm really proud of what we have achieved. The app combined AR with meaningful education, and seeing people respond positively to it was incredibly rewarding. The experience taught me a lot about teamwork, adaptability, and using tech to make a difference!</p>
      `,
      galleryImages: [
        "/images/NectAR/NectAR_Feature.png",
        "/images/NectAR/NectAR_1.jpg",
        "/images/NectAR/NectAR_2.jpg"
      ],
      technologies: "Made in Unity 5, VSCode, Vuforia"
    },
  ],
  experience: [
    {
      company: "National Video Game Museum",
      title: "Undergraduate Project Intern",
      dateRange: "Feb 2024 - Jun 2024",
      bullets: [
        "Created a gamified learning experience for teenagers to understand the basic concept of programming in C#.",
        "Mastered the ""Orientation – Conceptualization – Prototyping – Evaluation"" design cycle.",
        "Effectively managed client relationship with museum employees. Transforming the client's needs into a usable end product through continuous feedback and collaboration.",
      ],
    },
    {
      company: "Lucky Kat",
      title: "Intern",
      dateRange: "Sep 2022 - Jan 2023",
      bullets: [
        "Developed multiple single & multi-player levels from blockout to publishing, using the Sandbox engine (sandbox.game).",
        "Responsible for level layout, gameplay loop logic, creating story-quests, improving the level flow based on feedback.",
        "Collaborated with CareBears™ to create their Winterfest Experience in the sandbox Metaverse.",
      ],
    },
  ],
  education: [
    {
      school: "Hanze University of Applied Sciences",
      degree: "Bsc Communication & Multimedia with Game Design major, and Brand, Design & Psychology minor",
      dateRange: "Sep 2019 - Jul 2024",
      achievements: [
        "Worked in 4-6 person teams on semester long projects",
        "Took on versatile roles such as designer, project leader, programmer",
        "Monetization & Marketing: Finding appropriate marketing and monetization strategies to support the product's development cycle.",
        "Know and Control Your Business: Learned of business principles and the use of different models: Value Proposition, Business Model Canvas, SWOT.",
        "Concepting & User Behaviour: Analysing product target audience & Creating desired behaviours in the user base.",
      ],
    },
    {
      school: "European School of Brussels 1",
      degree: "European Baccalaureate",
      dateRange: "Sep 2006 - Jul 2016",
      achievements: [],
    },
  ],
};
